import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
// 自动按需引入element-plus组件
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 全局scss样式
        additionalData: '@import "@/assets/css/global.scss";'
      }
    }
  },
  server: {
    port: 8080,
    open: true,
  },
});
