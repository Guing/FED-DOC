 const  fse = require('fs-extra')
 const ejs = require('ejs');
 const glob = require('glob')
 const inquirer = require('inquirer')
 async function install(options) {
    let { sourcePath, targetPath,templateInfo,projectInfo } = options;
     
    try {
       
        const project = await inquirer.prompt([{
            type: 'input',
            name: 'description',
            default: '',
            message: `请输入项目描述`,
            validate: function (v) {
                var done = this.async();
                setTimeout(function () {
                    if (!v) {
                        done(`请输入正确的项目描述`);
                        return;
                    }
                    done(null, true);
                }, 0);
                return
            },
          
        }])
        projectInfo = {
            ...projectInfo,
            ...project
        }
        fse.ensureDirSync(sourcePath);
        fse.ensureDirSync(targetPath)
        fse.copySync(sourcePath, targetPath)
    } catch (error) {
        throw new Error(error)
    } finally {
        console.log('模板安装成功')
    }
    const ignore = (templateInfo.ignore || []).concat(['**/node_modules'])
    await ejsRender({ ignore,templateInfo,projectInfo });
  

}
async function ejsRender(options) {
    const dir = process.cwd();
    const projectInfo = options.projectInfo;
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
module.exports = install