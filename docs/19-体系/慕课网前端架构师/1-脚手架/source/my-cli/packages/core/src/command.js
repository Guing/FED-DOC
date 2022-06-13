import { Command } from 'commander/esm.mjs'
import { init, create } from '@dcli/commands'
import { log } from '@dcli/utils'
const program = new Command()
export function registerCommand(name, version) {
  //全局选项注册
  program
    .name(name)
    .usage('<command> [options]')
    .version(version)
    .option('-d --debug', '是否开启调试模式', false)

  //注册命令
  program
    .command('init [projectName]')
    .option('-f, --force', '是否强制初始化项目')
    .action(init)

  program
    .command('create [pageName]')
    .option('-f, --force', '是否强制创建项目')
    .action(create)

  //指定debug模式
  program.on('option:debug', function () {
    log.level = process.env.LOG_LEVEL = this.opts().debug ? 'verbose' : 'info'
  })

  //对未知命令监听
  program.on('command:*', function (obj) {
    const availableCommands = program.commands.map((cmd) => cmd.name())
    log.warn('提示', '未知命令：' + obj[0])
    if (availableCommands.length > 0) {
      log.warn('提示', '可用命令：' + availableCommands.join(','))
    }
  })
  //转化命令行参数
  program.parse(process.argv)
  //设置日志等级
  log.level = process.env.LOG_LEVEL = program.opts().debug ? 'verbose' : 'info'
  //没有输入参数，打印帮忙文档
  if (program.args && program.args.length < 1) {
    program.outputHelp()
  }
}
