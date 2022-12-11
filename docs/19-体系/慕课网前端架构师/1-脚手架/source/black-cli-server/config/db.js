'use strict';
const fs = require('fs')
const path = require('path')
const userHome = require('user-home')
const host = 'localhost';
// Mondodb
const mongodbPWD = fs.readFileSync(path.resolve(userHome, '.imooc-web', 'password')).toString().trim()
const mongodbUrl = 'mongodb://root:'+mongodbPWD+'@'+host+':27017';
const mongodbName = 'black-cli'

/**
 * OSS
 */
const OSS_ACCESS_KEY = 'LTAI5tR4Rk7FV1XGTTjv69dm'
const OSS_ACCESS_SECRET_KEY = fs.readFileSync(path.resolve(userHome, '.imooc-web', 'oss_access_secret_key')).toString()
const OSS_PROD_BUCKET = 'black-cli'
const OSS_DEV_BUCKET = 'black-cli-dev'
const OSS_PROD_HOST = 'cli.blackfe.com'
const OSS_DEV_HOST = 'dev-cli.blackfe.com'
const OSS_REGION = 'oss-cn-guangzhou'
const OSS_COMPONENT_BUCKET ='cloudscope-component'

/*
 * Mysql 
 */
const MYSQL_HOST = host
const MYSQL_PORT = 3306
const MYSQL_USER = 'root'
const MYSQL_PWD = fs.readFileSync(path.resolve(userHome, '.imooc-web', 'password')).toString().trim()
const MYSQL_DB = 'imooc_web_architect_cli'

module.exports = {
  mongodbUrl,
  mongodbName,
  OSS_ACCESS_KEY,
  OSS_ACCESS_SECRET_KEY,
  OSS_PROD_BUCKET,
  OSS_DEV_BUCKET,
  OSS_PROD_HOST,
  OSS_DEV_HOST,
  OSS_REGION,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB,
  OSS_COMPONENT_BUCKET
};
