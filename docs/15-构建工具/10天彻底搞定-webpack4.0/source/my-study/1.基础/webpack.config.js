let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let { CleanWebpackPlugin } = require('clean-webpack-plugin');
let webpack = require('webpack');
module.exports = {
   mode: 'development',
   entry: './src/index.js',
   devServer: { //开发服务器设置
      port: 3000,  //端口
      progress: true,  //是否显示进度
      contentBase: './dist', //打包文件的目录
      compress: true  //启用gzip压缩
   },
   output: {
      filename: '[name].[hash:8].js',
      path: path.resolve(__dirname, 'dist'),

   },
   externals:{
         jquery:'$'
   },
   module: {
      rules: [
         {
            test:require.resolve('jquery'), //解析包的路径
            use:'expose-loader?$'
         },
         {
            test:/\.html$/,
            use:'html-withimg-loader'
         },
         {
            test:/\.(png|gif|jpg)/,
            use:['file-loader']
         },
         {
            test: /\.js$/,
            use: [
               {
                  loader: 'babel-loader',
                  options: {
                     presets: [
                        [
                           "@babel/preset-env",
                           {
                              "targets": {
                                 "chrome": "88",
                                 "ie":"9"
                              }
                           }
                        ]
                     ],
                     plugins: [
                        ["@babel/plugin-proposal-decorators", {
                           "legacy": true
                        }],
                        "@babel/plugin-transform-runtime"
                     ]
                  },
                
               }
            ],
            include:path.resolve(__dirname,'src'),
            exclude:/node_modules/
         },
         {
            test: /\.css$/,
            use: [
               //   {
               //       loader: 'style-loader',
               //    }, 
               {
                  loader: MiniCssExtractPlugin.loader,
               },
               {
                  loader: 'css-loader',
               },
               {
                  loader: 'postcss-loader'
               }
            ]
         },
         {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
         }
      ],
   },
   plugins: [ //里面放所有的插件数组

      new HtmlWebpackPlugin({
         template: './src/index.html',
         filename: 'index.html'
      }),
      new MiniCssExtractPlugin({
         filename: '[name].[hash].css'
      }),
      new CleanWebpackPlugin(),
      // new webpack.ProvidePlugin({
      //    $:'jquery'
      // })
   ]
}