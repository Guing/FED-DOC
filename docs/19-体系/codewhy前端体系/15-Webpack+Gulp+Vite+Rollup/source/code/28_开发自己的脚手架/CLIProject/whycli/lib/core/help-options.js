const { program } = require('commander')

function helpOptions() {
  // 1.处理--version的操作
  const version = require('../../package.json').version
  program.version(version, '-v --version')

  // 2.增强其他的options的操作
  program.option('-w --why', "a why cli program~")
  program.option('-d --dest <dest>', 'a destination folder, 例如: -d src/components')

  program.on('--help', () => {
    console.log("")
    console.log("others:")
    console.log("  xxx")
    console.log("  yyy")
  })
}

module.exports = helpOptions
