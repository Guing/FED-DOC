import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path'; // 提示 path 没有，安装 @types/node -D

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // __dirname 当前 js 的绝对路径
    }
  },
  base: './', // 公共基础路径
  server: {
    port: 4000,
    open: true,
    cors: true
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
});
