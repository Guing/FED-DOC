/* eslint valid-jsdoc: "off" */

'use strict';
const { MYSQL_DB, MYSQL_HOST, MYSQL_PORT, MYSQL_PWD, MYSQL_USER } = require('./db')
// local
const REDIS_PORT = 6379
const REDIS_HOST = '127.0.0.1'
const REDIS_PWD = ''

// remote aliyun
// const REDIS_PORT = 6379
// const REDIS_HOST ='xxxxxxx.com'
// const REDIS_PWD ='admin:pass'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1614131635487_1265';

  // add your middleware config here
  config.middleware = [];

  // add Websocket Server Config
  config.io = {
    namespace: {
      '/': {
        connectionMiddleware: ['auth'],
        packetMiddleware: ['filter'],
      }
    }
  }

  config.redis = {
    client: {
      port: REDIS_PORT,
      host: REDIS_HOST,
      password: REDIS_PWD,
      db: 0,
    },
  }

  config.mysql = {
    client: {
      host: MYSQL_HOST,
      port: MYSQL_PORT,
      user: MYSQL_USER,
      password: MYSQL_PWD,
      database: MYSQL_DB
    },
    app: true,
    agent: false
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
