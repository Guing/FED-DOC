# 快速实现一个commander脚手架

之前在学习命令注册的时候，使用的是yrags，本节使用另一个库 commander去实现命令注册 本节代码提交至：[liugezhou-yargs-demo](https://github.com/liugezhou/liugezhou-yargs-demo) 其中 bin/yargs.js是之前学习yargs的demo代码。 bin/commander.js是本节关于commander的代码。

我们在这个库的基础上，学习commander的简单用法.

- 首先，安装npm i -S commander
- 然后，在bin/index.js中：

```javascript
#!/usr/bin/env node

const commander = require('commander')
const pkg = require("../package.json")

// 获取commander的单例
// const {program} = commander

// 手动实例化一个Command示例
const program = new commander.Command()

program
  .name(Object.keys(pkg.bin)[0])
  .usage('<command> [options]')
  .version(pkg.version)
  .option('-d, --debug', '是否开启调试模式', false)
  .option('-e, --envName  <envName>' , '环境变量')
  .parse(process.argv);

  const options = program.opts()
  console.log(options.debug)
  program.outputHelp()   //打印出帮助信息
```

- liugezhou-test -V,即可看到输入版本号。
- liugezhou-test -d // true

# commander脚手架命令注册的两种方法

课程所讲内容：commander命令注册有两种方式：

1. comman API注册命令
2. addCommand API 注册命令

现在默认安装commander时，已更新到7.0.0，sam老师写法还是6.X，可参考 [commader for git](https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md) 配置。本节内容就是对官方文档更新用法之后的学习笔记：



1. Commander.js :完整的node.js命令行解决方法
2. 声明commander变量为简化声明，Commander提供了一个全局对象

```javascript
const { program } = require('commander')
program.version('0.0.1')
```

若程序较为复杂，用户需要以多种方式来使用Commander，如单元测试等，可采用创建本地Commander对象的方法

```javascript
const {Command } = require('commander')
const program = new Command();
program.version('0.0.1')
```

3.选项

```javascript
program
//Commander 使用.option() 方法来定义选项，同时可以附加选项的简介
    .option('-d,--debug','booelan') 
//选项可以设置一个默认值。
    .option('-c, --cheese <type>', 'add the specified type of cheese', 'blue');
//必填选项
    .requiredOption('-n, --name <type>', 'name must have cheese');
//通过program.parse(arguments)方法处理参数
program.parse(process.argv)
const ret = program.opts()
const debug = ret.debug
```

4.命令

```javascript
program.
//参数支持必须<>,可选[]
    command('clone <source> [destination]')
//在参数名后加上...来声明可变参数，且只有最后一个参数支持这种用法
program
    .command('rmdir <dirs...>')
    .action(function (dirs) {
      dirs.forEach((dir) => {
        console.log('rmdir %s', dir);
      });
    });
```

## commander注册命令的两种高级用法

1. 监听所有命令输入 : arguments

```javascript
// 匹配所有命令
program
    .arguments('<cmd> [options]')
    .description('test command', {
        cmd: 'command to run',
        options: 'options for command'
    })
    .action((cmd, env) => {
        console.log(cmd, env);
    })
```

1. 脚手架串行使用

```javascript
program
    .command('install [name]', 'install package', {
        executableFile: 'cli-intall', // 手动修改命令
        isDefault: true, // 执行默认
        hidden: true, // 隐藏命令
    })
    .alias('i')
```

## 高级定制

1. 高级定制help信息

```javascript
// 高级定制1：自定义help信息
program.helpInformation = () => {
    return ''
};
program.on('--help', function () {
    console.log('your help information');
})
```

1. 高级定制debug模式

```javascript
// 高级定制2：实现debug模式
program.on('option:debug', function () {
    console.log('debug', ret.debug);
    if (ret.debug) {
        process.env.LOG_LEVEL = 'verbose'
    }
})
```

1. 高级定制未知命令监听

```javascript
// 高级定制3：未知命令监听
program.on('command:*', function (obj) {
    console.log(obj);
    const allRegistryCommand = program.commands.map(cmd => cmd.name())
    console.log('未知命令：' + obj[0])
    console.log('可用命令', allRegistryCommand.join(','));
})
```

# 完整代码

```javascript
#!/usr/bin/env node

const { Command } = require('commander')
// 获取commander的单例
// const { program } = commander
const pkg = require('../package.json')

// 手动实例化一个Command
const program = new Command()

program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    //Commander 使用.option() 方法来定义选项，同时可以附加选项的简介
    //选项可以设置一个默认值。
    .option('-d, --debug', '是否开启调试模式', false)
    //必填选项
    .option('-e, --envName <envName>', '获取环境变量名称')

const ret = program.opts()

// command 注册命令
//参数支持必须<>,可选[]
const clone = program.command('clone <sourse> [destination]');
clone
    .description('clone a repository')
    .option('-f, --force', '是否强制克隆')
    .action((sourse, destination, cmdObj) => {
        console.log('do clone', sourse, destination, cmdObj.force);
    })

//在参数名后加上...来声明可变参数，且只有最后一个参数支持这种用法
program
    .command('rmdir <dirs...>')
    .action(function (dirs) {
        dirs.forEach((dir) => {
            console.log('rmdir %s', dir);
        });
    });

// addCommand 注册子命令
const service = new Command('service')
service
    .command('start [prot]')
    .description('start service at some port')
    .action((port) => {
        console.log('do service start', port);
    });
service
    .command('stop')
    .description('stop service ')
    .action((port) => {
        console.log('stop service');
    })
program.addCommand(service)


program
    .command('install [name]', 'install package', {
        // executableFile: 'cli-intall', // 手动修改命令
        isDefault: false, // 执行默认
        hidden: true, // 隐藏命令
    })
    .alias('i')

// 匹配所有命令
// program
//     .arguments('<cmd> [options]')
//     .description('test command', {
//         cmd: 'command to run',
//         options: 'options for command'
//     })
//     .action((cmd, env) => {
//         console.log(cmd, env);
//     })

// 高级定制1：自定义help信息
// program.helpInformation = () => {
//     return ''
// };
// program.on('--help', function () {
//     console.log('your help information');
// })

// 高级定制2：实现debug模式
program.on('option:debug', function () {
    console.log('debug', ret.debug);
    if (ret.debug) {
        process.env.LOG_LEVEL = 'verbose'
    }
})
// 高级定制3：未知命令监听
program.on('command:*', function (obj) {
    console.log(obj);
    const allRegistryCommand = program.commands.map(cmd => cmd.name())
    console.log('未知命令：' + obj[0])
    console.log('可用命令', allRegistryCommand.join(','));
})

//通过program.parse(arguments)方法处理参数
program.parse(process.argv);
```

