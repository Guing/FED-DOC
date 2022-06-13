import { getNewVersion, log, require } from '@dcli/utils'
import rootCheck from 'root-check'
import path from 'path'
import os from 'os'
import fse from 'fs-extra'
import dotenv from 'dotenv'
import semver from 'semver'
import { DEFAULT_CLI_HOME } from './const.js'
import { registerCommand } from './command.js'
import process from 'process'
import * as url from 'url'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const pkg = require(path.join(__dirname, '../package.json'))
const homedir = os.homedir()

export default async function core() {
  try {
    await prepare()
    registerCommand(Object.keys(pkg.bin)[0], pkg.version)
  } catch (e) {
    log.error(e.message)
    if (process.env.LOG_LEVEL == 'verbose') {
      console.log(e)
    }
  }
}

async function prepare() {
  //查看当前版本
  checkPkgVersion()
  //检查是不是root用户启动
  rootCheck()
  //检查用户主目录是否存在
  checkUserHome()
  //检查环境变量
  checkEnv()
  //检查包更新
  // checkGlobalUpdate();
}

async function checkGlobalUpdate() {
  const currentVersion = pkg.version
  const npmName = pkg.name
  const newVersion = await getNewVersion(npmName, currentVersion)
  if (newVersion && semver.gt(newVersion, currentVersion)) {
    log.warn(
      '更新提示',
      `最新版本为${newVersion},当前版本为${currentVersion}，请及时更新`
    )
  }
}
function checkEnv() {
  const dotenvPath = path.resolve(homedir, DEFAULT_CLI_HOME, '.env')
  if (fse.pathExistsSync(dotenvPath)) {
    dotenv.config({
      path: dotenvPath
    })
  }
  const cliConfig = {
    home: homedir,
    cliHome: path.join(
      homedir,
      process.env.CLI_HOME ? process.env.CLI_HOME : DEFAULT_CLI_HOME
    )
  }

  process.env.CLI_HOME_PATH = cliConfig.cliHome
}

function checkUserHome() {
  if (!homedir || !fse.pathExistsSync(homedir)) {
    throw new Error('当前用户主目录不存在')
  }
}

function checkPkgVersion() {
  log.info('cli', pkg.version)
}
