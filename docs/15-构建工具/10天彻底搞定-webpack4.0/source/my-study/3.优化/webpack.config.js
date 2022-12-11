const HtmlWebpackPlugin = require('html-webpack-plugin');
let path = require('path');
let webpack = require('webpack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    optimization: {
        splitChunks: {
            chunks: 'initial',
            filename: 'vendor.js'
        }
    },
    devServer:{
        hot:true
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        noParse: /jquery/,
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    },
    plugins: [
        // new webpack.DllReferencePlugin({
        //     manifest:path.resolve(__dirname,'dll','manifest.json')
        // }),
        new HardSourceWebpackPlugin(),
      
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]

}