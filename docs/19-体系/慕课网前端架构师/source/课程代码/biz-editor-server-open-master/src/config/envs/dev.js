/**
 * @description dev 配置
 * @author 双越
 */
const fs = require('fs')
const path = require('path')
const userHome = require('user-home')
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
        password: fs.readFileSync(path.resolve(userHome, '.black-cli', 'mongodb_pwd')).toString().trim()
    },

    // mysql 连接配置
    mysqlConf: {
        host: 'blackfe.com',
        user: 'root',
        password: fs.readFileSync(path.resolve(userHome, '.black-cli', 'mongodb_pwd')).toString().trim(),
        port: '3306',
        database: 'editor-server',
    },

    // cors origin
    corsOrigin: '*',

    // 短信验证码缓存时间，单位 s
    msgVeriCodeTimeout: 2 * 60,

    // jwt 过期时间
    jwtExpiresIn: '1d', // 1. 字符串，如 '1h' '2d'； 2. 数字，单位是 s

    // 发布出来的 h5 域名
    h5Origin: 'http://localhost:3001',

    // 阿里云 OSS 配置
    aliyunOSSConf: {
        // 此处省略 N 行代码
    },
    // 阿里云 OSS CDN 配置
    aliyunOSS_CDNHost: 'static-dev.imooc-lego.com',

    // 腾讯云短信服务配置
    tencentMsgConf: {
        // 获取密钥 https://console.cloud.tencent.com/cam/capi
        // 此处省略 N 行代码
    },

    // 百度云内容审核
    baiduCloudCensorConf: {
        // 此处省略 N 行代码
    },

    // 报警邮箱
    adminMails: ['1417789619@qq.com'],
}
