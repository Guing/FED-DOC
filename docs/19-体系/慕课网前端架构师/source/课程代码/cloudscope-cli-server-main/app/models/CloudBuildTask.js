'use strict';

const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
const userHome = require('user-home')
const Git = require('simple-git')
const glob = require('glob')
const { SUCCESS, FAILED } = require('../constant')
const OSS = require('./OSS')
const config = require('../../config/db')
const REDIS_PREFIX = 'cloudbuild'
class CloudBuildTask {
    constructor(options, ctx, app) {
        this._ctx = ctx
        this._app = app
        this._name = options.name //项目名称
        this._version = options.version //项目版本号
        this._repo = options.repo
        this._branch = options.branch
        this._buildCmd = options.buildCmd //构建命令
        this.logger = this._ctx.logger
        // 服务器的用户主目录 + 缓存目录
        this._dir = path.resolve(userHome, '.cloudscope-cli', 'cloudbuild', `${this._name}@${this._version}`)
        this._sourceCodeDir = path.resolve(this._dir, this._name) //缓存源码目录
        this._buildPath = null  //构建结果Path路径
        this._prod = options.prod === 'true' ? true : false
    }

    async prepare() {
        fse.ensureDirSync(this._dir)
        fse.emptyDirSync(this._dir)
        this._git = new Git(this._dir)
        if (this._prod) { //生产准备OSS
            this.oss = new OSS(config.OSS_PROD_BUCKET)
        } else {//测试
            this.oss = new OSS(config.OSS_DEV_BUCKET)
        }
        return this.success()
    }

    async download() {
        await this._git.clone(this._repo)  //clone仓库
        this._git = new Git(this._sourceCodeDir)  //将git地址更改，生成新的simple git
        // 切换分支  git checkout -b dev/1.0.2  origin/dev/1.0.2
        await this._git.checkout(['-b', this._branch, `origin/${this._branch}`])
        return fs.existsSync(this._sourceCodeDir) ? this.success() : this.failed()
    }

    async install() {
        const res = await this.execCmd('npm install --registry=https://registry.npm.taobao.org')
        return res ? this.success() : this.failed()
    }

    async build() {
        let res = true
        if (checkCommand(this._buildCmd)) {
            res = await this.execCmd(this._buildCmd)
        } else {
            res = false
        }
        return res ? this.success() : this.failed()
    }

    async prePublish() {
        //获取构建结果
        const buildPath = this.findBuildPath()
        //检查构建结果
        if (!buildPath) {
            return this.failed('未找到构建结果，请检查')
        }
        this._buildPath = buildPath
        return this.success()
    }

    async publish() {
        return new Promise(resolve => {
            glob('**', {
                cwd: this._buildPath,
                nodir: true,
                ignore: '**/node_modules/**'
            }, (err, files) => {
                if (err) {
                    resolve(false)
                } else {
                    Promise.all(files.map(async file => {
                        const filePath = path.resolve(this._buildPath, file)
                        const uploadOSSRes = await this.oss.put(`${this._name}/${file}`, filePath)
                        return uploadOSSRes
                    })).then(() => {
                        resolve(true)
                    }).catch(err => {
                        this._ctx.logger.error(err)
                        resolve(false)
                    })
                }
            })
        })
    }

    findBuildPath() {
        const buildDir = ['build', 'dist']
        const buildPath = buildDir.find(dir => fs.existsSync(path.resolve(this._sourceCodeDir, dir)))
        this._ctx.logger.info('buildPath', buildPath)
        if (buildPath) {
            return path.resolve(this._sourceCodeDir, buildPath)
        }
        return null
    }
    execCmd(cmd) {
        // npm install ->['npm','install']
        let command = cmd.split(' ')
        if (command.length === 0) {
            return null
        }
        const firstCommand = command[0]
        const leftCommand = command.slice(1) || []
        return new Promise(resolve => {
            const p = exec(firstCommand, leftCommand, {
                cwd: this._sourceCodeDir
            }, { stdio: 'pipe' })
            p.on('error', e => {
                this._ctx.logger.error('build error', e)
                resolve(fasle)
            })
            p.on('exit', c => {
                this._ctx.logger.info('build exit', c)
                resolve(true)
            })
            p.stdout.on('data', data => {
                this._ctx.socket.emit('building', data.toString())
            })
            p.stderr.on('data', data => {
                this._ctx.socket.emit('building', data.toString())
            })
        })
    }

    success(msg, data) {
        return this.response(SUCCESS, msg, data)
    }
    failed(msg, data) {
        return this.response(FAILED, msg, data)
    }
    response(code, message, data) {
        return {
            code,
            message,
            data
        }
    }

    async clean() {
        if (fs.existsSync(this._dir)) {
            fse.removeSync(this._dir);
        }
        const { socket } = this._ctx;
        const client = socket.id;
        const redisKey = `${REDIS_PREFIX}:${client}`;
        await this._app.redis.del(redisKey);
    }
    isProd() {
        return this._prod
    }
}

function exec(command, args, options) {
    const win32 = process.platform === 'win32';
    const cmd = win32 ? 'cmd' : command
    const cmdArgs = win32 ? ['/c'].concat(command, args) : args;
    return require('child_process').spawn(cmd, cmdArgs, options || {})
}

function checkCommand(command) {
    if (command) {
        const commands = command.split(' ')
        if (commands.length === 0 || ['npm', 'cnpm'].indexOf(commands[0]) < 0) {
            return false
        }
        return true
    }
    return false
}
async function createCloudBuildTask(ctx, app) {
    const { socket, helper } = ctx
    const { redis } = app
    const client = socket.id
    const redisKey = `${REDIS_PREFIX}:${client}`
    const redisTask = await redis.get(redisKey)
    const task = JSON.parse(redisTask)
    socket.emit('build', helper.parseMsg('create task', {
        message: '创建云构建任务'
    }))
    return new CloudBuildTask({
        repo: task.repo,
        name: task.name,
        version: task.version,
        branch: task.branch,
        buildCmd: task.buildCmd,
        prod: task.prod
    }, ctx, app)
}
module.exports = {
    CloudBuildTask,
    createCloudBuildTask
}