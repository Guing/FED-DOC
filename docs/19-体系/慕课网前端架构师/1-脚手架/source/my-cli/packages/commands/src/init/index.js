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
const TYPE_PROJECT = 'project'
const TYPE_COMPONENT = 'component'
const CONFIG_FILE_NAME = '.initConfig.json'
const TEMPLATE_DIR_NAME = 'template'

let projectName, //项目名称
  projectTemplate, //项目模板
  commandOptions, //指令参数
  commandObj, //指令对象
  initConfig //配置

export async function init(...argv) {
  commandObj = argv[argv.length - 1]
  projectName = argv[0] || ''
  commandOptions = argv[1]
  try {
    //执行准备
    await prepare()
    //获取默认模板配置
    getConfig()
    //获取项目的基本信息
    await getProjectInfo()
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
  let packagePath = getPackage(tempPath, projectTemplate)
  if (!packagePath) {
    packagePath = await downPackage(tempPath, projectTemplate)
  } else {
    updatePackage(tempPath, projectTemplate)
  }
  fse.copySync(path.join(packagePath, 'template'), process.cwd())
}
async function prepare() {
  //1.判断当前目录是否为空
  const localPath = process.cwd()
  if (!isEmptyDir(localPath)) {
    let ifContinue
    //询问是否继续创建
    if (!commandOptions.force) {
      ifContinue = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'ifContinue',
          default: false,
          message: '当前目录不为空，是否继续创建'
        }
      ])
    }
    //2.是否启动强制更新
    if (ifContinue || commandOptions.force) {
      //二次确认清空当前目录
      const { ifDel } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'ifDel',
          default: false,
          message: '是否确认清空当前目录'
        }
      ])
      if (ifDel) {
        fse.emptyDirSync(localPath)
      } else {
        return false
      }
    } else {
      return false
    }
  }
}
function getConfig() {
  const jsonPath = path.join(process.env.CLI_HOME_PATH, CONFIG_FILE_NAME)
  if (!fse.pathExistsSync(jsonPath)) {
    fse.copySync(path.join(__dirname, './config.json'), jsonPath)
  }
  initConfig = require(jsonPath)
}

async function getProjectInfo() {
  function isValidName(v) {
    return /^[a-zA-Z]+([-][a-zA-Z][a-zA-Z0-9]*|[_][a-zA-Z][a-zA-Z0-9]*|[a-zA-Z0-9]*)$/.test(
      v
    )
  }
  //3.选择创建项目或组件
  const { createType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'createType',
      default: false,
      choices: [
        {
          name: '项目',
          value: TYPE_PROJECT
        },
        {
          name: '组件',
          value: TYPE_COMPONENT
        }
      ],
      message: '请选择创建类型'
    }
  ])
  const templateList = initConfig[createType]
  const title = createType === TYPE_PROJECT ? '项目' : '组件'
  const promptArray = [
    {
      type: 'list',
      name: 'projectTemplate',
      default: '',
      choices: templateList.map((item) => {
        return { name: item.desc, value: item.name }
      }),
      message: `请选择${title}模板`
    }
  ]

  // 如果一开始输入的项目名不对，这里重新输入
  if (!isValidName(projectName)) {
    promptArray.unshift({
      type: 'input',
      name: 'projectName',
      message: `请输入${title}名称`,
      default: '',
      validate: function (v) {
        var done = this.async()
        setTimeout(function () {
          if (!isValidName(v)) {
            done(`请输入正确的${title}名称`)
            return
          }
          done(null, true)
        }, 0)
        return
      }
    })
  }

  const data = await inquirer.prompt(promptArray)
  projectTemplate = data.projectTemplate
  data.projectName && (projectName = data.projectName)
}
