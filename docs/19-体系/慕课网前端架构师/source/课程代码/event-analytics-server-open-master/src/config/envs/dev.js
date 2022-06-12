/**
 * @description dev 配置
 * @author 双越
 */
const fs = require('fs')
const path = require('path')
const userHome = require('os').homedir();
module.exports = {
    // mongodb 连接配置
    mongodbConf: {
        host: 'blackfe.com',
        port: '27017',
        password: fs.readFileSync(path.resolve(userHome, '.imooc-web', 'password')).toString().trim(),
        user: 'root',
        dbName: 'editor-server',
    },

    // access_log 日志文件目录，要和 nginx_conf/dev/event.conf 保持一致！
    accessLogPath: '/Users/wfp/nginx_logs/event_analytics',

    // cors origin
    corsOrigin: '*',
}
