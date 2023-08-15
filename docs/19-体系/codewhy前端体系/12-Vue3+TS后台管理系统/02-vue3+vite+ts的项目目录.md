- 使用vue3+vite+ts创建项目的文件目录

```bash
├── .vscode  #使用vscode推荐安装的插件
├── .eslintrc.cjs #eslint的配置文件
├── .gitignore #git忽略文件
├── .prettierrc.json #perttier的配置文件
├── env.d.ts #TS项目的全局类型声明文件，比如包含声明 declare module '*.jpg'
├── index.html #静态首页
├── package.json #包描述文件
├── pnpm-lock.yaml #pnpm的锁文件
├── README.md #项目说明文件
├── tsconfig.app.json #项目中业务代码的TS配置
├── tsconfig.json #合并上下这两个文件
├── tsconfig.node.json #项目中除了业务代码，比如vite这些TS文件的配置
└── vite.config.ts #vite的配置文件
```

