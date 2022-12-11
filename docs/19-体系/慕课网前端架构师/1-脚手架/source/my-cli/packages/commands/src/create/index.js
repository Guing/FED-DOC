import fse from 'fs-extra'
import path from 'path'
import process from 'process'
import {
  require,
  log,
  isEmptyDir,
  downPackage,
  getPackage,
  updatePackage
} from '@dcli/utils'
import inquirer from 'inquirer'
import * as url from 'url'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const CONFIG_FILE_NAME = '.createConfig.json'
const TEMPLATE_DIR_NAME = 'template'

let pageName, //页面名称
  pageTemplate, //项目模板
  commandOptions, //指令参数
  commandObj, //指令对象
  config //配置

export async function create(...argv) {
  commandObj = argv[argv.length - 1]
  pageName = argv[0] || ''
  commandOptions = argv[1]
  try {
    //执行准备
    await prepare()
    //获取默认模板配置
    getConfig()

    //下载模板
    await downloadTemplate()
  } catch (e) {
    log.error(e.message)
    if (process.env.LOG_LEVEL === 'verbose') {
      console.log(e)
    }
  }
}
async function downloadTemplate() {
  const tempPath = path.join(process.env.CLI_HOME_PATH, TEMPLATE_DIR_NAME)
  let packagePath = getPackage(tempPath, pageTemplate)
  if (!packagePath) {
    packagePath = await downPackage(tempPath, pageTemplate)
  }
  // else {
  //   updatePackage(tempPath,
  //     pageTemplate);
  // }
  fse.copySync(
    path.join(packagePath, 'template', 'App.vue'),
    path.join(process.cwd(), pageName + '.vue')
  )
}
async function prepare() {
  //1.判断当前目录是否有同名的文件
  const localPath = process.cwd()
  if (fse.pathExistsSync(path.join(localPath, pageName))) {
    let ifContinue
    //询问是否继续创建
    if (!commandOptions.force) {
      ifContinue = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'ifContinue',
          default: false,
          message: '当前有同名的文件，是否继续创建'
        }
      ])
    }
    ifContinue && process.exit()
  }
}
function getConfig() {
  const jsonPath = path.join(process.env.CLI_HOME_PATH, CONFIG_FILE_NAME)
  if (!fse.pathExistsSync(jsonPath)) {
    fse.copySync(path.join(__dirname, './config.json'), jsonPath)
  }
  config = require(jsonPath)
  pageTemplate = config.page.name
}
