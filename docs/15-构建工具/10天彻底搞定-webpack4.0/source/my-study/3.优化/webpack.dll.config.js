let path = require('path');
let webpack = require('webpack');
module.exports = {
    entry:{
        react:['react','react-dom']
    },
    output:{
        filename:'__dll__[name].js',
        path:path.resolve(__dirname,'dll'),
        library:'__dll__[name]',
    },
    module:{
        noParse:/jquery/,
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
    plugins:[
        new webpack.DllPlugin({
            name:'__dll__[name]',
            path:path.resolve(__dirname,'dll','manifest.json')
        })
    ]
}