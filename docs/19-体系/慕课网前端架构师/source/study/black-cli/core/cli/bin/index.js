#! /usr/bin/env node

const importLocal = require("import-local")
const log = require("@black-cli/log")
if(importLocal(__filename)){
    log.info("","正在使用 black-cli 本地版本")
}else{
    require("../lib")(process.argv.slice(2))
}

