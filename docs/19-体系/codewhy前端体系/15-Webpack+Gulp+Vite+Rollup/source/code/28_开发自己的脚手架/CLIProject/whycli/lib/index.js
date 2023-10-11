#!/usr/bin/env node
const { program } = require('commander')
const { createProjectAction, addComponentAction } = require('./core/actions')
const helpOptions = require('./core/help-options')

// 1.配置所有的options
helpOptions()

// 2.增加具体的一些功能操作
program
  .command("create <project> [...others]")
  .description("create vue project into a folder, 比如: whycli create airbnb")
  .action(createProjectAction)

program
  .command("addcpn <cpnname> [...others]")
  .description("add vue component into a folder, 比如: whycli addcpn NavBar -d src/components")
  .action(addComponentAction)

// 让commander解析process.argv参数
program.parse(process.argv)

// 获取额外传递的参数
// console.log(program.opts().dest)
