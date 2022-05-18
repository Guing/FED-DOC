let path = require('path');
let fs = require('fs');
let fse = require('fs-extra');
let ejs = require('ejs');
let babylon = require('babylon'); //把源码转化成AST
let types = require('@babel/types'); //替换AST中的节点
let traverse = require('@babel/traverse').default; //遍历AST语法树
let generator = require('@babel/generator').default; //把AST语法树生成代码。
let { SyncHook } = require('tapable')
class Complier {
    constructor(config) {
        this.config = config;
        this.entryId = ""; //入口的名字
        this.modules = {} //所有的模块依赖
        this.entry = config.entry; // 入口路径
        this.rootPath = process.cwd() //当前的工作路径
        this.assets = {} //输出的文件列表
        //定义一些勾子函数
        this.hooks = {
            entryOption: new SyncHook(),
            compile: new SyncHook(),
            afterCompile: new SyncHook(),
            afterPlugins: new SyncHook(),
            run: new SyncHook(),
            emit: new SyncHook(),
            done: new SyncHook()
        }
        // 如果传递了plugins参数
        let plugins = this.config.plugins;
        if (Array.isArray(plugins)) {
            plugins.forEach(plugin => {
                plugin.apply(this);
            });
        }
        this.hooks.afterPlugins.call();
    }
    parse(source, parentPath) {
        console.log(source);
        let ast = babylon.parse(source); //
        let dependencies = [];// 依赖的数组

        traverse(ast, {
            CallExpression(p) { //   require('index')
                let node = p.node; // 对应的节点
                if (node.callee.name === 'require') {
                    node.callee.name = '__webpack_require__';
                    let moduleName = node.arguments[0].value; //取出require的参数index，也就是模块的引用名
                    moduleName = moduleName + (path.extname(moduleName) ? '' : '.js'); //如果没有扩展名，则加上.js
                    moduleName = './' + path.join(parentPath, moduleName); //模块引用名加上父目录名,比如 'src/index.js' 
                    dependencies.push(moduleName); //将此依赖添加到全局依赖中
                    node.arguments = [types.stringLiteral(moduleName)];  //修改AST节点的模块名
                }
            }
        });
        let sourceCode = generator(ast).code; //生新生成代码

        return { sourceCode, dependencies }
    }
    //获取模块内容
    getSource(modulePath) {
        let content = fs.readFileSync(modulePath, 'utf-8');
        let rules = this.config.module.rules;
        // 拿到每个规则来处理
        for (let i = 0; i < rules.length; i++) {
            let rule = rules[i];
            let { test, use } = rule;
            let len = use.length - 1;
            if (test.test(modulePath)) { // 这个模块需要通过loader来转化
                // loader获取对应的loader函数
                function normalLoader() {
                    let loader = require(use[len--]);
                    // 递归调用loader 实现转化功能
                    content = loader(content);
                    if (len >= 0) {
                        normalLoader();
                    }
                }
                normalLoader();
            }
        }
        return content;
    }
    // 构建模块
    buildModule(modulePath, isEntry) {
        // 拿到模块的内容
        let source = this.getSource(modulePath);
        // 模块id modulePath  = modulePath- this.root  src/index.js
        let moduleName = './' + path.relative(this.rootPath, modulePath);
        // 保存入口的名字
        if (isEntry) {
            this.entryId = moduleName;
        }
        // 解析需要把source源码进行改造 返回一个依赖列表
        let { sourceCode, dependencies } = this.parse(source, path.dirname(moduleName));
        // 把相对路径和模块中的内容 对应起来
        this.modules[moduleName] = sourceCode;
        dependencies.forEach(dep => { // 子模块的加载 递归加载
            this.buildModule(path.join(this.rootPath, dep), false);
        });

    }
    // 发射文件
    emitFile() {
        //拿到输出路径
        let main = path.join(this.config.output.path, this.config.output.filename);
        let templateStr = this.getSource(path.join(__dirname, 'main.ejs')); //获取模板
        let code = ejs.render(templateStr, { entryId: this.entryId, modules: this.modules }); //生成最终代码
        this.assets = {};
        this.assets[main] = code;
        //输出文件
        fse.outputFileSync(main, this.assets[main], err => {
            if (err) {
                console.log(err);
            }
        })

    }
    run() {
        this.hooks.run.call();
        this.hooks.compile.call();
        // 执行 并且创建模块的依赖关系
        this.buildModule(path.resolve(this.rootPath, this.entry), true)
        // 输出文件
        this.emitFile();
        this.hooks.emit.call();
        this.hooks.done.call();
    }
}
module.exports = Complier