'use strict';
const Package = require('@black-cli/package')
const log = require('@black-cli/log')
const { exec: spawn } = require('@black-cli/utils')
const path = require('path')
module.exports = exec;
const SETTINGS = {
    'init': '@black-cli/init',
    'publish': '@black-cli/publish'

}
const CACHE_DIR = 'dependencies'
async function exec() {
    let targetPath = process.env.CLI_TARGET_PATH
    const homePath = process.env.CLI_HOME_PATH
    let storeDir = '';
    let pkg;
    const command = arguments[arguments.length - 1];
    const packageName = SETTINGS[command.name()];
    const packageVersion = 'latest';
    if (!targetPath) {
        targetPath = path.resolve(homePath, CACHE_DIR) //生成缓存路径
        storeDir = path.resolve(targetPath, 'node_modules')
        log.verbose('targetPath', targetPath)
        log.verbose('storeDir', storeDir)
        pkg = new Package({
            targetPath,
            packageName,
            storeDir,
            packageVersion
        });
        if (await pkg.exists()) {
            // 更新package
            log.verbose('更新package')
            await pkg.update();
        } else {
            // 安装package
            await pkg.install();
        }
    } else {
        log.verbose('已输入targetPath：', targetPath)
        pkg = new Package({
            targetPath,
            packageName,
            packageVersion
        });
    }



    const pathFile = pkg.getRootFilePath();
    log.verbose('package的入口文件：', pathFile)
    if (pathFile) {
        try {
            let args = Array.from(arguments);
            const o = Object.create(null);
            const cmd = args[args.length - 1];
            Object.keys(cmd).forEach(key => {
                if (cmd.hasOwnProperty(key) && !key.startsWith('_')
                    && key !== 'parent'
                ) {
                    o[key] = cmd[key]
                }
            })


            args[args.length - 1] = o;
            const code = `require('${process.platform === 'win32' ? pathFile.replace(/\\/g, '\\\\') : pathFile}').call(null,  ${JSON.stringify(args)})`;
            const child = spawn('node', ['-e', code], {
                cwd: process.cwd(),
                stdio: 'inherit'
            })
            child.on('error', (error) => {
                log.info('命令执行失败：', error);
                process.exit(1)
            })
            child.on('exit', (code) => {
                log.info(`命令执行${code == 0 ? '成功' : '失败'}：`, code);
                process.exit(code)
            })
        } catch (error) {
            log.error(error.message)
        }

    }


}
