const { src, dest, parallel, series, watch } = require("gulp");

const htmlmin = require("gulp-htmlmin");
const babel = require('gulp-babel')
const terser = require('gulp-terser')
const less = require('gulp-less')

const inject = require('gulp-inject')
const browserSync = require('browser-sync')

// 1.对html进行打包
const htmlTask = () => {
  return src("./src/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("./dist"));
};

// 2.对JavaScript进行打包
const jsTask = () => {
  return src("./src/**/*.js")
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(terser({ toplevel: true }))
    .pipe(dest('./dist'))
};

// 3.对less进行打包
const lessTask = () => {
  return src("./src/**/*.less")
    .pipe(less())
    .pipe(dest("./dist"))
}

// 4.在html中注入js和css
const injectTask = () => {
  return src('./dist/**/*.html')
    .pipe(inject(src(['./dist/**/*.js', './dist/**/*.css']), { relative: true }))
    .pipe(dest('./dist'))
}

// 5.开启一个本地服务器
const bs = browserSync.create()
const serve = () => {
  watch("./src/**", buildTask)

  bs.init({
    port: 8080,
    open: true,
    files: './dist/*',
    server: {
      baseDir: './dist'
    }
  })
}

// 创建项目构建的任务
const buildTask = series(parallel(htmlTask, jsTask, lessTask), injectTask)
const serveTask = series(buildTask, serve)
// webpack搭建本地 webpack-dev-server

module.exports = {
  buildTask,
  serveTask
};
