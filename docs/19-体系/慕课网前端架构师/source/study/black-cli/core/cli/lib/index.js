
module.exports = core;
const path = require('path');
const os = require('os')
const process = require('process')

const log = require('@black-cli/log')
const init = require('@black-cli/init')
const { getNewVersion } = require('@black-cli/get-npm-info');
const exec = require('@black-cli/exec')
const pkg = require("../package.json")
const semver = require('semver')
const constant = require('./const')
const dotenv = require('dotenv');
const { Command } = require('commander')
let rootCheck;
let pathExists;
let homedir;
const program = new Command();
async function core() {
    try {
        await prepare();
        registerCommand();
    } catch (e) {
        log.error(e.message);
        if(process.env.LOG_LEVEL == 'verbose'){
            console.log(e)
        }
    }

}
function registerCommand() {
    //全局选项注册
    program
        .name(Object.keys(pkg.bin)[0])
        .usage('<command> [options]')
        .version(pkg.version)
        .option('-d --debug', '是否开启调试模式', false)
        .option('-tp --targetPath <targetPath>', '是否指定本地调试文件路径', '');

    //注册命令
    program
        .command('init [projectName]')
        .option('-f, --force', '是否强制初始化项目')
        .action(exec)

    program
        .command('publish')
        .option('--refreshServer','强制更新远程Git仓库类型和token')
        .option('--refreshOwner','强制更新远程Git仓库用户类型')
        .option('--buildCmd [buildCmd]','构建命令')
        .option('--prod','是否正式发布')
        .option('--sshUser [sshUser]','服务器用户名')
        .option('--sshIp [sshIp]','服务器IP或域名')
        .option('--sshPath [sshPath]','服务器上传路径')
        .action(exec)
    //指定debug模式
    program.on('option:debug', function () {
        log.level = process.env.LOG_LEVEL = this.opts().debug ? 'verbose' : 'info'
    })
    //指定targetPath
    program.on('option:targetPath', function () {
        process.env.CLI_TARGET_PATH = this.opts().targetPath;
    })
    //对未知命令监听
    program.on('command:*', function (obj) {
        const availableCommands = program.commands.map(cmd => cmd.name());
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
        program.outputHelp();
    }
}
async function prepare() {
    rootCheck = await (await import('root-check')).default;
    pathExists = await (await import('path-exists'));
    checkPkgVersion();

    rootCheck();
    checkUserHome();
    checkEnv();
    checkGlobalUpdate();
}
async function checkGlobalUpdate() {
    const currentVersion = pkg.version;
    const npmName = pkg.name
    const newVersion = await getNewVersion(npmName, currentVersion);
    if (newVersion && semver.gt(newVersion, currentVersion)) {
        log.warn('更新提示', `最新版本为${newVersion},当前版本为${currentVersion}，请及时更新`)
    }

}
function checkEnv() {

    const dotenvPath = path.resolve(homedir, '.env')
    if (dotenvPath) {
        config = dotenv.config({
            path: dotenvPath
        })
    }
    createDefaultConfig()
}
function createDefaultConfig() {
    const cliConfig = {
        home: homedir
    };
    if (process.env.CLI_HOME) {
        cliConfig['cliHome'] = path.join(homedir, process.env.CLI_HOME)
    } else {
        cliConfig['cliHome'] = path.join(homedir, constant.DEFAULT_CLI_HOME)
    }

    process.env.CLI_HOME_PATH = cliConfig.cliHome;

    return cliConfig;
}


function checkUserHome() {
    homedir = os.homedir();
    if (!homedir || !pathExists.pathExistsSync(homedir)) {
        throw new Error('当前用户主目录不存在')
    }
}

function checkPkgVersion() {
    log.info("cli", pkg.version)
}
