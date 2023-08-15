## 区分development和production 环境

- 在webpack使用的process.env区分环境，但是vite不经过node处理，直接通过浏览器转发，没有process，所以使用import上添加meta。

- Vite 在一个特殊的` import.meta.env `对象上暴露环境变量。这里有一些在所有情况下都可以使用的内建变量： 

  - **import.meta.env.MODE: {string} 应用运行的模式。** 
  - **import.meta.env.PROD: {boolean} 应用是否运行在生产环境。** 
  - **import.meta.env.DEV: {boolean} 应用是否运行在开发环境 (永远与 import.meta.env.PROD相反)。** 
  - **import.meta.env.SSR: {boolean} 应用是否运行在 server 上。** 

  ```typescript
  // 2.代码逻辑判断, 判断当前环境
  // vite默认提供的环境变量
  // console.log(import.meta.env.MODE) //当前的环境变量
  // console.log(import.meta.env.DEV) // 是否开发环境
  // console.log(import.meta.env.PROD) // 是否生产环境
  // console.log(import.meta.env.SSR) // 是否是服务器端渲染(server side render)
  let BASE_URL = ''
  if (import.meta.env.PROD) {
    // 生产环境
    BASE_URL = 'http://152.136.185.210:4000'
  } else {
    // 开发环境
    BASE_URL = 'http://152.136.185.210:5000'
  }
  ```

### `.env` 文件

- Vite 使用 [dotenv](https://github.com/motdotla/dotenv) 从你的 [环境目录](https://cn.vitejs.dev/config/shared-options.html#envdir) 中的下列文件加载额外的环境变量：
- 加载的环境变量也会通过 `import.meta.env` 以字符串形式暴露给客户端源码。

```
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```

- 为了防止意外地将一些环境变量泄漏到客户端，只有以 `VITE_` 为前缀的变量才会暴露给经过 vite 处理的代码。例如下面这些环境变量：

```
VITE_SOME_KEY=123
DB_PASSWORD=foobar
```

只有 `VITE_SOME_KEY` 会被暴露为 `import.meta.env.VITE_SOME_KEY` 提供给客户端源码，而 `DB_PASSWORD` 则不会。

```js
console.log(import.meta.env.VITE_SOME_KEY) // 123
console.log(import.meta.env.DB_PASSWORD) // undefined
```

### mode

`vite build` 时运行不同的模式来渲染不同的标题，你可以通过传递 `--mode` 选项标志来覆盖命令使用的默认模式。例如，如果你想在 staging （预发布）模式下构建应用：

```bash
vite build --mode staging
```

新建一个 `.env.staging` 文件：

```
# .env.staging
VITE_APP_TITLE=My App (staging)
```

### TypeScript 的智能提示

默认情况下，Vite 在 [`vite/client.d.ts`](https://github.com/vitejs/vite/blob/main/packages/vite/client.d.ts) 中为 `import.meta.env` 提供了类型定义。随着在 `.env[mode]` 文件中自定义了越来越多的环境变量，你可能想要在代码中获取这些以 `VITE_` 为前缀的用户自定义环境变量的 TypeScript 智能提示。

要想做到这一点，你可以在 `src` 目录下创建一个 `env.d.ts` 文件，接着按下面这样增加 `ImportMetaEnv` 的定义：

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

