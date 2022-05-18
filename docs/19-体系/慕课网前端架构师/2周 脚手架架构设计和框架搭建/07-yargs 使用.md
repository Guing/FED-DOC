初始化解析

```javascript
#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const arg = hideBin(process.argv)

yargs(arg)
    .argv;
```
```javascript

#!/usr/bin/env node

const yargs = require('yargs/yargs')
// const { hideBin } = require('yargs/helpers')
const log = require("npmlog");
const dedent = require('dedent')
const pkg = require("../package.json");

// const arg = hideBin(process.argv)  // 解析命令
const cli = yargs()

const argv = process.argv.slice(2)
const context = {
    cliDevVersion: pkg.version,
};

cli
    // 配置 第一行的使用提示
    .usage('Usage: $0 [command] <options>')
    // 配置 提示用户脚手架最少要接收一个命令
    .demandCommand(1, "A command is required. Pass --help to see all available commands and options.")
    // 配置 命令输入错误或者没有此命令的时候可以根据输入推荐合适的命令
    .recommendCommands()
    // 配置 命令错误时执行的方法
    .fail((err, msg) => {
        log.error('err', err);
        console.log('msg', msg);
    })
    // 配置 严格模式，最后一行提示命令错误，如：无法识别的选项：lis
    .strict()
    .alias("h", "help")  // 别名
    .alias("v", "version")
    // 配置 终端宽度   
    .wrap(cli.terminalWidth())
    // 配置 尾部的提示文字 去除缩进
    .epilogue(dedent`
      When a command fails, all logs are written to lerna-debug.log in the current working directory.

      For more information, find our manual at https://github.com/lerna/lerna
    `)
    // 全局指令，对象
    .options({
        debug: {
            type: 'boolean',
            describe: 'Bootstrap debug mode',
            alias: 'd'
        }
    })
    // 只能传入一个字符串参数(命令)
    .option("ci", {
        hidden: true, // 命令隐藏，但是还是可以用，一般供内部开发用
        type: "boolean",
    })
    .option("registry", {
        type: "string",
        describe: 'Define global registry',
        alias: 'r'
    })
    // 选项分组
    .group(['debug'], "Dev Options:")
    .group(['registry'], "Extra Options:")
    // 配置 命令，当执行 init [name] 命令的时候一系列的行为
    .command('init [name]', 'Do init a project', (yargs) => {
        yargs
            .option('name', {
                type: 'string',
                describe: 'Name of a project',
                alias: 'n'
            })
    }, (argv) => {
        log.info(argv);
    })
    // 配置 命令的第二种方法
    .command({
        command: 'list',
        aliases: ["ls", "la", "ll"],
        describe: 'List local packages',
        builder: (yargs) => {
        },
        handler: (argv) => {
            console.log(argv);
        }
    })
    // 解析参数
    .parse(argv, context);
```

## 如何通过Yargs来开发脚手架?

- 脚手架分为三部分构成(vue create vuex)

  - bin:主命令在package.json中配置bin属性，npm link本地安装

  - command:命令
  - options:参数(boolean/string/number)
  - 文件顶部增加#!/usr/bin/env node,这行命令的用途时告诉操作系统要在环境变量当中查询到node命令,通过node命令来执行文件

- 脚手架初始化流程

- - 构造函数:Yargs() (通过Yargs构造函数的调用去生成一个脚手架)
  - 常用方法:

- - - Yargs.option

    - Yargs.group (将脚手架属性进行分组)

    - `yargs(arg).demandCommand(1, '最少需要一个命令')` 表示最少需要几个命令，不需要有 `.strict()` 的调用

    - Yargs.recommendCommands (在输入错误command以后可以给你推荐最接近的正确的command)

    - Yargs.strict (开启以后，在输入的命令找不到时，报错。默认会输出 `--help` 的内容及默认报错)

    - Yargs.fail (监听脚手架的异常)

    - `yargs(arg).alias('h', 'help')` 为命令设置别名，为 `--help` 使用别名 `-h`

    - Yargs.wrapper (命令行工具的宽度)

    - Yargs.epilogus (命令行工具底部的提示)

    - `yargs.wrap(yargs(arg).terminalWidth())` 设置脚手架输出的命令行宽度。`yargs(arg).terminalWidth()` 表示终端的宽度。整体表示占满整行

    - `yargs(arg).usage(msg)` 展示命令的用法。可以理解成，输出msg

      - ```javascript
        yargs(arg).usage('Usage: $0 <command> [option]')
        ```

        `$0` 指向的是 `command` 。如本地开发一个 `yargs-test` 命令行工具，输入 `yargs-test ls`

        `argv:  { _: [ 'ls' ], cliVersion: '1.0.0', '$0': 'yargs-test' }

    - `yargs(arg).options(obj)` 增加一个全局选项，所有 `command` 都能访问。添加一个 `--debug` option

    ```javascript
    yargs(arg).options({
    	debug: {
    		type: 'boolean',
    		describe: 'Bootstrap debug mode'
    	}
    })
    ```

    

- 脚手架参数解析方法

- - hideBin(process.argv)
  - Yargs.parse(argv, options)

- 命令注册方法

- - Yargs.command(command,describe, builder, handler)
  - Yargs.command({command,describe, builder, handler})

更多命令可以从参考 [`yargs github`](https://github.com/yargs/yargs/blob/HEAD/docs/api.md#optionskey-opt)

- `yargs(arg).option('opt', obj)` 和 `yargs(arg).options(obj)` 作用一样，只不过一次只能添加一个全局命令

- `yargs(arg).group(Array, str)` 为命令分组，在 `--help` 显示时，分组显示命令。参数是一个 `option` 数组，第二个参数是分组名

- `yargs(arg).command(cmd, desc, [builder], [handler])` 注册命令，`lerna --option` 中的 `--option`，这个方法很重要

  - `cmd` 是 `command` 的格式
  - `desc` 是 `cmd` 的描述
  - `builder` 函数，在执行命令之前执行
  - `handler` 函数，`command` 的行为

  [`npm`](https://www.npmjs.com/package/yargs) 上的例子

  ```javascript
  #!/usr/bin/env node
  const yargs = require('yargs/yargs')
  const { hideBin } = require('yargs/helpers')
  
  yargs(hideBin(process.argv))
    .command('serve [port]', 'start the server', (yargs) => {
      yargs
        .positional('port', { 
          describe: 'port to bind on',
          default: 5000
        })
    }, (argv) => {
      if (argv.verbose) console.info(`start server on :${argv.port}`)
      serve(argv.port)
    })
    .option('verbose', {
      alias: 'v',
      type: 'boolean',
      description: 'Run with verbose logging'
    })
    .argv
  ```

  `.positional()` 为 `command` 定义参数，和 `.option()` 类似，但只在 `builder` 函数中的 `yargs` 实例上存在。

  - `lerna` 中  `command` 的对象传参

    ```javascript
    yargs(arg).commamd({
      command,
      alias,
      describe,
      builder,
      handler
    })
    ```

  - [更多](https://github.com/yargs/yargs/blob/HEAD/docs/api.md#commandcmd-desc-builder-handler)

- `yargs(arg).fail(err, msg)` 处理在命令执行失败时的操作，需要先调用 `.strict()`

- `yargs().parse(argv, obj)` 参数解析。`argv` 是 `process.argv.slice(2)`，**和直接传入个 `yargs()` 的 `argv` 不同—`hideBin(process.argv)`**， 命令行输入的 `command` 后面的 `option` ，该方法会将 `argv` 和 `obj` 进行合并，可以向 `argv` 中注入参数

  - 这里有个地方要注意

    ```javascript
    let context = {
      otherVersion: pak.version
    }
    yargs().parse(argv, context)
    ```

    `context` 中的版本号 `key` 不要用 `version`，否则输入命令是，将始终执行 `--version`。总之，就是**不要使用跟命令重复的 `key`**
    -

