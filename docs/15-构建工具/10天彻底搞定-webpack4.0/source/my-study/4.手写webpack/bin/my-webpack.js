#!/usr/bin/env node

let path = require('path');
let config = require(path.resolve('webpack.config.js')) //读取配置文件
let Complier = require('../lib/complier')
let complier = new Complier(config)
complier.run()
