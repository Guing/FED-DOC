### 第五章：imooc-cli脚手架publish模块开发

#### 5-1 创建publish模块

本模块在调试的时候出现问题：

- lerna create @cloudscope-cli/publish commands
- publish模块下lib的index中，打印日志：console.log('publish')
- 接着使用webstorm调试exec的时候，debug没有进去。
- 参数为：

- - Node parameters:**/Users/liumingzhou/Documents/imoocCourse/Web前端架构师/cloudscope-cli/core/cli/bin/index.js  publish  --targetPath /Users/liumingzhou/Documents/imoocCourse/Web前端架构师/cloudscope-cli/commands/publish**
  - Working directory: **~/Desktop/test**

查找原因为：

- 首先将本地连接全部去除 ： 进入到node的modules目录下将相关的脚手架liugezhou的cloudscope的全部删除
- 进入到cloudscope-cli/core/cli 下npm install 

- - 发现在utils下等有一些package2的包，于是去到相关包下，删除重新安装

- npm install正确后，npm link，link完毕之后在本地which cloudscole-cli 看到有了包
- 然后在webstorm中调试的  Node parameters中重新配置(在publish之前加空格)  

最后在一个空目录中输入以下命令进行调试：

cloudscope-cli publish --targetPath /Users/liumingzhou/Documents/imoocCourse/Web前端架构师/cloudscope-cli/commands/publish 

打印出：publish

#### 

#### 5-2 publish基本流程开发

接下来的重点就是编写业务代码：cloudscope-cli/commands/publish/lib/index.js

- 参考init中的代码，extends Command
- 必须实现init和exec方法，否则报错
- 该文件中用到的log / Command等需要npm install引入

```javascript
'use strict';
const Command = require('@cloudscope-cli/command')
const log = require('@cloudscope-cli/log')
class PublishCommand extends Command {
    init(){
        // 处理参数
        console.log('init',this._argv)
    }

    async exec(){
        try {
            const startTime = new Date().getTime()
            //1. 初始化检查
            this.prepare()
            //2.Git Flow自动化

            //3.云构建 + 云发布
            const endTime = new Date().getTime()
            log.info('本次发布耗时',Math.floor(endTime-startTime)/1000+'秒')
        } catch (e) {
            log.error(e.message)
            if(process.env.LOG_LEVEL === 'verbose'){
                log.error(e.message)
            }
        }
    }
  
   prepare(){
    
	 }
}


function init(argv){
    return new PublishCommand(argv)
}
module.exports = init
module.exports.PublishCommand = PublishCommand;
```

#### 5-3 项目发布前预检查流程开发

结合上一节代码，本节主要内容为：

- 初始化检查prepare

- - 确认项目是否npm项目
  - 确认项目的package.json中是否包含name/version/scripts/scripts.build

```javascript
prepare(){
  // 1.确认项目是否为npm项目
  const projectPath =  process.cwd()
  const pkgPath = path.resolve(projectPath,'package.json')
  log.verbose('package.json',pkgPath)
  if(!fs.existsSync(pkgPath)){
    throw new Error('package.json不存在')
  }
  //2. 确认是否包含name\version\build命令
  const pkg = fse.readJsonSync(pkgPath)
  const {name,version,scripts} = pkg
  if(!name || !version || !scripts || !scripts.build ){
    throw new Error('package.json信息不全，请检查是否存在name、version和scripts(需提供build命令)')
  }
  this.projectInfo = {name,version,dir:projectPath}
}
```

