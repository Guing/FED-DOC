/**
 * @description dev 配置
 * @author 双越
 */

module.exports = {
    // mysql 连接配置
    mysqlConf: {
        host: 'localhost',
        user: 'root',
        password: 'Mysql_2019',
        port: '3306',
        database: 'imooc_lego_course',
    },

    // mongodb 连接配置
    mongodbConf: {
        host: 'localhost',
        port: '27017',
        dbName: 'imooc_lego_course',
    },

    // redis 连接配置
    redisConf: {
        port: '6379',
        host: '127.0.0.1',
    },

    // jwt 过期时间
    jwtExpiresIn: '1d', // 1. 字符串，如 '1h' '2d'； 2. 数字，单位是 s

    // cors origin
    corsOrigin: '*',
}
