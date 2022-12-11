'use strict';
const fs = require('fs');
const log = require('@black-cli/log')
const Command = require('@black-cli/command')
const fse = require('fs-extra');
const inquirer = require('inquirer')
const TYPE_PROJECT = 'project';
const TYPE_COMPONENT = 'component';
const TYPE_PROJECT_NORMAL = 'normal';
const TYPE_PROJECT_CUSTOM = 'custom'
const semver = require('semver')
const getProjectTemplate = require('./getProjectTemplate')
const ejs = require('ejs')
const glob = require('glob')
const os = require('os')
const Package = require('@black-cli/package');
const { spinnerStart, sleep, execSync } = require('@black-cli/utils')
const path = require('path');
const WHITE_COMMAND = ['npm', 'cnpm', 'yarn', 'pnpm']
module.exports = init;
class initCommand extends Command {
    constructor(argv) {
        super(argv)

    }
    init() {
        this.projectName = this._projectName || '';
        this.force = this._options ? (!!this._options.force) : false;

    }
    async exec() {
        //通过项目模版API获取项目模版信息
        // - 通过egg.js搭建一套后台系统  (4-2 至 4-5)
        // - 通过npm存储项目模版
        // - 将项目模版信息存储到mongodb数据库中
        // - 通过egg.js获取mongodb中的数据并且通过API将其返回
        try {
            //1.准备阶段
            const projectInfo = await this.prepare()
            if (projectInfo) {
                this.projectInfo = projectInfo;
                log.verbose('projectInfo', projectInfo)
                //2.下载模板
                await this.downloadTemplate()
                //3.安装模板
                await this.installTemplate();
            }

        } catch (error) {
            log.error(error.message);
        }

    }
    async installTemplate() {
        if (this.templateInfo) {
            if (this.templateInfo.type === TYPE_PROJECT_NORMAL) {
                this.installNormalTemplate();
            } else if (this.templateInfo.type === TYPE_PROJECT_CUSTOM) {
                this.installCustomTemplate();
            } else {
                throw new Error('项目模板类型错误')
            }
        } else {
            throw new Error('项目模板不存在')
        }
    }
    async installNormalTemplate() {

        const spinner = spinnerStart('正在安装模板');
        try {

            const templatePath = path.resolve(this.templateNpm.cacheFilePath, 'template')
            const targetPath = process.cwd();
            log.verbose('\ntemplatePath:', templatePath)
            log.verbose('targetPath:', targetPath)
            fse.ensureDirSync(templatePath);
            fse.ensureDirSync(targetPath)
            fse.copySync(templatePath, targetPath)
        } catch (error) {
            throw new Error(error)
        } finally {
            spinner.stop(true)
            log.success('模板安装成功')
        }
        const ignore = (this.templateInfo.ignore || []).concat(['**/node_modules'])
        await this.ejsRender({ ignore });
        const { installCommand, startCommand } = this.templateInfo
        //依赖安装
        await this.execCommand(installCommand,'依赖安装过程中失败！');
        //启动服务
        await this.execCommand(startCommand,'依赖启动过程中失败！');


    }
    async installCustomTemplate() {
     const rootFile = this.templateNpm.getRootFilePath();
    
       if(fs.existsSync(rootFile)){
           log.notice('开始执行自定义模板')
           const templatePath = path.resolve(this.templateNpm.cacheFilePath, 'template')
           const options = {
            templateInfo:this.templateInfo,
            projectInfo:this.projectInfo,
               sourcePath:templatePath,
               targetPath:process.cwd()
           };
           const code =  `require('${process.platform === 'win32' ? rootFile.replace(/\\/g, '\\\\') : rootFile}')( ${JSON.stringify(options)})`;
           log.verbose('code',code)
           await execSync('node',['-e',code], {
            stdio: 'inherit',
            cwd: process.cwd()
        });
           log.success('自定义模板安装成功')
           
       }else{
           throw new Error('自定义模板入口文件不存在')
       }
    }
    async ejsRender(options) {
        const dir = process.cwd();
        const projectInfo = this.projectInfo;
        return new Promise((resolve, reject) => {
            glob('**', {
                cwd: dir,
                ignore: options.ignore || '',
                nodir: true
            }, (err, files) => {
                if (err) {
                    reject(err)
                }
                return Promise.all(files.map(file => {
                    return new Promise((resolve1, reject1) => {
                        const filePath = path.join(dir, file)

                        ejs.renderFile(filePath, projectInfo, {}, (err, result) => {
                            if (err) {
                                reject1(err)
                            } else {
                                fse.writeFileSync(filePath, result)
                                resolve1(result)
                            }
                        })
                    })
                })).then(() => {
                    resolve()
                }).catch(err => {
                    reject(err);
                })
            })
        })
    }
    checkCommand(cmd) {
        if (!WHITE_COMMAND.includes(cmd)) {
            return false;
        }
        return cmd;
    }
    async execCommand(cmd, message) {
        let ret;
        try {
            if (cmd) {
                const cmdArray = cmd.split(" ");
                const cmdExec = this.checkCommand(cmdArray[0]);
                const args = cmdArray.slice(1);
                ret = await execSync(cmdExec, args, {
                    stdio: 'inherit',
                    cwd: process.cwd()
                })
                if (ret !== 0) {
                    throw new Error(message)
                }
            }
            return ret;
        } catch (error) {
            log.error(error.message)
        }

    }
    async downloadTemplate() {
        const { projectTemplate } = this.projectInfo;
        const templateInfo = this.template.find(item => item.npmName === projectTemplate);
        this.templateInfo = templateInfo;
        const userHome = os.homedir();
        const targetPath = path.resolve(userHome, '.black-cli', 'template')
        const storeDir = path.resolve(userHome, '.black-cli', 'template', 'node_modules')
        const { npmName, version } = templateInfo;
        const templateNpm = new Package({
            targetPath,
            storeDir,
            packageName: npmName,
            packageVersion: version
        })
        this.templateNpm = templateNpm;
        if (! await templateNpm.exists()) {
            const spinner = spinnerStart("正在下载模板");
            await sleep();
            try {
                await templateNpm.install();
                log.success('项目模板下载成功')
            } catch (error) {
                throw error;
            } finally {
                spinner.stop(true)
            }
        } else {
            const spinner = spinnerStart("正在更新模板");
            await sleep();
            try {
                await templateNpm.update();

            } catch (error) {
                throw error;
            } finally {
                spinner.stop(true)
                log.success('\n项目模板更新成功')
            }
        }

    }
    async prepare() {
        //0.判断模板是否存在
        const template = await getProjectTemplate();
        if (!template || template.length === 0) {
            throw new Error('项目模板不存在')
        }
       
        this.template = template
        //1.判断当前目录是否为空
        const localPath = process.cwd();
        if (!this.isCmdEmpty(localPath)) {
            let ifContinue;
            //询问是否继续创建
            if (!this.force) {
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
            if (ifContinue || this.force) {
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
                    return false;
                }
            } else {
                return false;
            }

        }
        //4.获取项目的基本信息
        return await this.getProjectInfo();


    }
    async getProjectInfo() {
        function isValidName(v) {
            return /^[a-zA-Z]+([-][a-zA-Z][a-zA-Z0-9]*|[_][a-zA-Z][a-zA-Z0-9]*|[a-zA-Z0-9]*)$/.test(v)
        }
        let projectInfo = {}
        //3.选择创建项目或组件 
        const { createType } = await inquirer.prompt([
            {
                type: 'list',
                name: 'createType',
                default: false,
                choices: [{
                    name: '项目',
                    value: TYPE_PROJECT
                }, {
                    name: '组件',
                    value: TYPE_COMPONENT
                }],
                message: '请选择创建类型'
            }
        ])
        this.template = this.template.filter(item => item.tag.includes(createType));
        const title = createType === TYPE_PROJECT ? '项目' : '组件'
        let promptArray = [

            {
                type: 'input',
                name: 'projectVersion',
                default: '1.0.0',
                message: `请输入${title}版本号`,
                validate: function (v) {
                    var done = this.async();
                    setTimeout(function () {
                        if (!semver.valid(v)) {

                            done(`请输入正确的${title}版本号`);
                            return;
                        }
                        done(null, true);
                    }, 0);
                    return
                },
                filter: function (v) {
                    if (!!semver.valid(v)) {
                        return semver.valid(v)
                    } else {
                        return v;
                    }
                }
            },
            {
                type: 'list',
                name: 'projectTemplate',
                default: '',
                choices: this.getTemplateList(),
                message: `请选择${title}模板`
            }
        ]
      
        const namePrompt = {
            type: 'input',
            name: 'projectName',
            message: `请输入${title}名称`,
            default: '',
            validate: function (v) {
                var done = this.async();
                setTimeout(function () {
                    if (!isValidName(v)) {
                        done(`请输入正确的${title}名称`);
                        return;
                    }
                    done(null, true);
                }, 0);
                return
            }
        };
        if (!isValidName(this.projectName)) {
            promptArray.unshift(namePrompt);
        }
        if (createType === TYPE_PROJECT) {

            const project = await inquirer.prompt(promptArray)
            projectInfo = {
                ...(this.template.filter(item=>item.npmName === project.projectTemplate)[0] || {}),
                projectName: this.projectName,
                type: createType,
                ...project
            }
        } else if (createType == TYPE_COMPONENT) {
            promptArray.push({
                type: 'input',
                name: 'description',
                default: '',
                message: `请输入${title}描述`,
                validate: function (v) {
                    var done = this.async();
                    setTimeout(function () {
                        if (!v) {
                            done(`请输入正确的${title}描述`);
                            return;
                        }
                        done(null, true);
                    }, 0);
                    return
                },
              
            })
            const component = await inquirer.prompt(promptArray)
            projectInfo = {
                ...(this.template.filter(item=>item.npmName === component.projectTemplate)[0] || {}),
                projectName: this.projectName,
                type: createType,
                ...component
            }
        }
        if (projectInfo.projectName) {
            projectInfo.className = require('kebab-case')(projectInfo.projectName).replace(/^-/, '')
        }
        return projectInfo
    }
    getTemplateList() {
        return this.template.map(item => {
            return { name: item.name, value: item.npmName }
        })
    }
    isCmdEmpty(localPath) {

        const fileList = fs.readdirSync(localPath);
        const filterList = fileList.filter(file => !file.startsWith('.') && !['node_modules'].includes(file))
        return fileList.length === 0;
    }
}



function init(argv) {
    return new initCommand(argv)
}
