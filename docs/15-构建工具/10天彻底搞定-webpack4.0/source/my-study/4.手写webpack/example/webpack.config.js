let path = require('path')
let logPlugin = require('../plugins/logPlugin')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.less/,
                use: [path.resolve(__dirname, './loaders/less-loader.js')]
            }
        ]
    },
    plugins: [new logPlugin()]

}