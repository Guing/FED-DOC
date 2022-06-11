/**
 * @description dev 配置
 * @author 双越
 */
const fs = require('fs');
const path = require('path');
const userHome = require('os').homedir();
module.exports = {
    // mongodb 连接配置
    mongodbConf: {
        host: 'blackfe.com',
        port: '27017',
        password: fs.readFileSync(path.resolve(userHome, '.black-cli', 'mongodb_pwd')).toString().trim(),
        user: 'root',
        dbName: 'editor-server',
    },

    // redis 连接配置
    redisConf: {
        port: '6379',
        host: 'blackfe.com',
        password: fs.readFileSync(path.resolve(userHome, '.black-cli', 'redis_pwd')).toString().trim()
    },

    // mysql 连接配置
    mysqlConf: {
        host: 'blackfe.com',
        user: 'root',
        password: fs.readFileSync(path.resolve(userHome, '.black-cli', 'mysql_pwd')).toString().trim(),
        port: '3306',
        database: 'editor-server',
    },

    // 阿里云 OSS 配置，Sam 老师提供
    aliyunOSSConf: {
        // 此处省略 N 行代码
        region: 'oss-cn-guangzhou',
        accessKeyId: 'LTAI5tR4Rk7FV1XGTTjv69dm',
        accessKeySecret: fs.readFileSync(path.resolve(userHome, '.black-cli', 'oss_access_secret_key')).toString(),
        bucket: 'black-cli-dev',
    },
    // 阿里云 OSS CDN 配置，Sam 老师提供
    aliyunOSS_CDNHost: 'dev-cli.blackfe.com',

    // 微信公众号配置
    // 在本地运行，由于微信 IP 白名单机制，可能运行不了。测试机和线上机是可以的，已添加白名单
    wxConf: {
        // 此处省略 N 行代码
    },
}
