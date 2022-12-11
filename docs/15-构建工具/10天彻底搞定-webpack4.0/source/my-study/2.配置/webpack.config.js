let path = require('path');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'production',
    //entry配置一个对象,key为代码块名，value为入口文件地址
    entry: {
        home: './src/index.js',
        // other: './src/other.js'
    },
    //输出的filename需要配置成[name]
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool:'nosources-source-map',
    devServer:{
        proxy:{
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {
                    '/api': ''
                }
            } 
        }
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:'babel-loader',
                options:{
                    presets:['@babel/preset-env']
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin('./dist'),
        //有多少个入口，就要配置多少个HtmlWebpackPlugin，并在chunks参数中引入代码块名，表示引用相关的入口
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            chunks: ['home']
        }),
        // new HtmlWebpackPlugin({
        //     template: './index.html',
        //     filename: 'other.html',
        //     chunks: ['other','home']
        // })
    ]
}