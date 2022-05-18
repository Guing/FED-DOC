'use strict';
const fs = require('fs')
const path = require('path')
const userHome = require('user-home')
// Mondodb
const mongodbUrl = 'mongodb://cloudscope:cloudscope@liugezhou.com:27017/cloudscope-cli';

/**
 * OSS
 */
const OSS_ACCESS_KEY = 'LTAI5tDd1aL1afQ1r4zCnx97'
const OSS_ACCESS_SECRET_KEY = fs.readFileSync(path.resolve(userHome, '.cloudscope-cli', 'oss_access_secret_key')).toString()
const OSS_PROD_BUCKET = 'cloudscope-cli'
const OSS_DEV_BUCKET = 'cloudscope-cli-dev'
const OSS_REGION = 'oss-cn-beijing'
const OSS_COMPONENT_BUCKET ='cloudscope-component'

/*
 * Mysql 
 */
const MYSQL_HOST = 'liugezhou.com'
const MYSQL_PORT = 3306
const MYSQL_USER = 'root'
const MYSQL_PWD = fs.readFileSync(path.resolve(userHome, '.cloudscope-cli', 'mysql_pwd')).toString().trim()
const MYSQL_DB = 'imooc_web_architect_cli'

module.exports = {
  mongodbUrl,
  OSS_ACCESS_KEY,
  OSS_ACCESS_SECRET_KEY,
  OSS_PROD_BUCKET,
  OSS_DEV_BUCKET,
  OSS_REGION,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB,
  OSS_COMPONENT_BUCKET
};
