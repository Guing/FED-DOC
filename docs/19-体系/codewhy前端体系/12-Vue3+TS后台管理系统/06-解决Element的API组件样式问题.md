- 针对ElMessage和ElLoading等组件引入样式

```typescript
// 1.全局引入样式(所有样式全部引入)
import 'element-plus/dist/index.css'

// 2.组件样式引入
import 'element-plus/theme-chalk/el-message.css'

```

- 使用vite-plugin-style-import
  - `npm install vite-plugin-style-import consola -D`
  - 在vite.config.ts中配置

```typescript
import {
  createStyleImportPlugin,
  ElementPlusResolve
} from 'vite-plugin-style-import'
export default defineConfig({
  plugins: [
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name: string) => {
            return `element-plus/theme-chalk/${name}.css`
          }
        }
      ]
    })
  ],
})

```

