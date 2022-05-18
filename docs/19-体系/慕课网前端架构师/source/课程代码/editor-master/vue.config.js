/* eslint-disable @typescript-eslint/no-var-requires */
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 在vue-config.js 中加入
// 开启gzip压缩
// 判断开发环境
const isStaging = !!process.env.VUE_APP_IS_STAGING
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: (isProduction && !isStaging) ? 'https://oss.imooc-lego.com/editor' : '/',
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#3E7FFF',
            'border-radius-base': '20px',
            'border-radius-sm': '10px'
          },
          javascriptEnabled: true
        }
      }
    }
  },
  configureWebpack: config => {
    // 开启gzip压缩
    if (isProduction) {
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: /\.js$|\.html$|\.json$|\.css/,
        threshold: 10240,
        minRatio: 0.8
      }))
      // 开启分离js
      config.optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 500000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name (module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`
              }
            }
          }
        }
      }
      config.stats = {
        warnings: false
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '慕课乐高'
        return args
      })
  },
  // 打包时不生成.map文件
  productionSourceMap: false
}
