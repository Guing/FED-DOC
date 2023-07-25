const path = require('path')

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, './build'),
    filename: "bundle.js"
  },
  resolveLoader: {
    modules: ["node_modules", "./hy-loaders"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          // "hy_loader01",
          // "hy_loader02",
          // "hy_loader03",

          // 给loader传递参数
          {
            loader: "hy_loader04",
            options: {
              name: "why",
              age: 18
            }
          }

          // {
          //   loader: "babel-loader",
          //   options: {
          //     plugins: [],
          //     presets: []
          //   }
          // }
        ]
      },
      // {
      //   test: /\.js$/,
      //   use: "hy_loader01"
      // },
      // {
      //   test: /\.js$/,
      //   use: "hy_loader02",
      //   enforce: "post"
      // },
      // {
      //   test: /\.js$/,
      //   use: "hy_loader03"
      // }
    ]
  }
}

