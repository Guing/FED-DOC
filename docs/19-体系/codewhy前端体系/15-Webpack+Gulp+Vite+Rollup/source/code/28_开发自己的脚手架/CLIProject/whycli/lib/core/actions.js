const { promisify } = require('util')
const { program } = require('commander')
const download = promisify(require('download-git-repo'))
const { VUE_REPO } = require('../config/repo')
const compileEjs = require('../utils/compile-ejs')
const execCommand = require('../utils/exec-command')
const writeFile = require('../utils/write-file')

async function createProjectAction(project) {
  try {
    // 1.从编写的项目模板中clone下来项目
    await download(VUE_REPO, project, { clone: true })

    // 2.很多的脚手架, 都是在这里给予提示
    // console.log(`cd ${project}`)
    // console.log(`npm install`)
    // console.log(`npm run dev`)

    // 3.帮助执行npm install
    console.log(process.platform)
    const commandName = process.platform === 'win32'? 'npm.cmd': 'npm'
    await execCommand(commandName, ["install"], { cwd: `./${project}` })

    // 4.帮助执行npm run dev
    await execCommand(commandName, ["run", "dev"], { cwd: `./${project}` })
  } catch (error) {
    console.log("github连接失败, 请稍后重试")
  }
}

async function addComponentAction(cpnname) {
  // 1.创建一个组件: 编写组件的模板, 根据内容给模板中填充数据
  const result = await compileEjs("component.vue.ejs", { 
    name: cpnname, 
    lowername: cpnname.toLowerCase() 
  })

  // 2.将result写到到对应的文件夹中
  const dest = program.opts().dest || "src/components"
  await writeFile(`${dest}/${cpnname}.vue`, result)
  console.log("创建组件成功:", cpnname + ".vue")
}

module.exports = {
  createProjectAction,
  addComponentAction
}