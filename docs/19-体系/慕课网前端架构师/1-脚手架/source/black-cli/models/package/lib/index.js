'use strict';
const path = require('path')
const pkgDir = require('pkg-dir').sync
const { isObject } = require('@black-cli/utils')
const { getDefaultRegistry, getLatestVersion } = require('@black-cli/get-npm-info')
const fse = require('fs-extra')
const log = require('@black-cli/log')
const npminstall = require('npminstall');
class Package {
    constructor(options) {
        if (!options || !isObject(options)) {
            throw new Error('请输入正确的参数')
        }
        //下载的包缓存在哪个根目录
        this.targetPath = options.targetPath
        //targetPath目录下的具体的目录
        this.storeDir = options.storeDir
        //package的name
        this.packageName = options.packageName;
        //package的Version
        this.packageVersion = options.packageVersion
        //package的缓存目录前缀
        this.cacheFilePathPrefix = this.packageName.replace('/', '_')

    }
    async prepare() {
        let pathExistsSync = await (await import('path-exists')).pathExistsSync;
        //缓存目录不存在，则创建缓存目录
        if (this.storeDir && !pathExistsSync(this.storeDir)) {
            fse.mkdirpSync(this.storeDir)
        }
        if (this.packageVersion == 'latest') {
            this.packageVersion = await getLatestVersion(this.packageName)
        }
    }
    get cacheFilePath() {
        return path.resolve(this.storeDir, `_${this.cacheFilePathPrefix}@${this.packageVersion}@${this.packageName}`)
    }
    getCacheCustomFilePath(packageVersion) {
        return path.resolve(this.storeDir, `_${this.cacheFilePathPrefix}@${packageVersion}@${this.packageName}`)
    }
    //判断当前package是否存在
    async exists() {
        let pathExistsSync = await (await import('path-exists')).pathExistsSync;
        if (this.storeDir) {
            await this.prepare();
            return pathExistsSync(this.cacheFilePath)
        } else {
            return pathExistsSync(this.targetPath)
        }

    }
    //安装
    install() {
        return npminstall({
            root: this.targetPath,
            storePath: this.storeDir,
            registry: getDefaultRegistry(),
            pkgs: [{
                name: this.packageName,
                version: this.packageVersion
            }]
        })
    }
    //更新
    async update() {
        let pathExistsSync = await (await import('path-exists')).pathExistsSync;
        await this.prepare();
        //查询最新的版本
        let latestPackageVersion = await getLatestVersion(this.packageName)

        //查询最新版本的包是否存在。
        if (latestPackageVersion && ! await pathExistsSync(this.getCacheCustomFilePath(latestPackageVersion))) {
            await npminstall({
                root: this.targetPath,
                storePath: this.storeDir,
                registry: getDefaultRegistry(),
                pkgs: [{
                    name: this.packageName,
                    version: latestPackageVersion
                }]
            })
            log.info('更新提示：', `${this.packageName}更新到${latestPackageVersion}`)
        }
        this.packageVersion = latestPackageVersion;

    }
    //获取入口文件的路径
    getRootFilePath() {
        function __getRootFile(targetPath) {
            let dir = pkgDir(targetPath)
            if (dir) {
                let pkg = require(path.resolve(dir, 'package.json'));
                if (pkg.main) {
                    return path.resolve(dir, pkg.main)
                }
                return null;
            }
            return null
        }
        if (this.storeDir) {
            return __getRootFile(this.cacheFilePath)
        } else {
            return __getRootFile(this.targetPath)
        }

    }
}

module.exports = Package;
