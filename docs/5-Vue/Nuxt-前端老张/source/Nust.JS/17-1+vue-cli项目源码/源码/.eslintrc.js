module.exports = {
  //此项是用来告诉eslint找当前配置文件不能往父级查找
  root: true,
  //此项指定环境的全局变量，下面的配置指定为node环境
  env: {
    node: true
  },
  // 此项是用来配置标准的js风格，就是说写代码的时候要规范的写
  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  // 规则
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 允许每行最大长度，默认100，改为300
    'max-len': ['error', {code : 300}],
    // 'linebreak-style': [0 ,'error', 'windows']
    // 允许无参数箭头函数
    // 'arrow-parens': 0,
    // 允许异步等待
    // 'generator-star-spacing': 0,
    // 在开发期间允许调试器
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  },
  parserOptions: {
    parser: 'babel-eslint',
  }
}