const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');

module.exports = {
  lintOnSave: false,
  baseUrl: '/',
  devServer: {
    port: 8080,
    open: true, // vue项目启动时自动打开浏览器
    proxy: {
      '/api': {
        target:'http://testapi.xuexiluxian.cn/',
      }
    },
  },
  configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, 'dist'),
        routes: [
          '/',
          '/member',
          '/course',
          '/loading',
          '/agreement'
        ],
      }),
    ],
  },
};
