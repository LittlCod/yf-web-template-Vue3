import { createApp } from 'vue';
import App from './App.vue';
// router和pinia
import router from './router';
import pinia from './store';
// 清除浏览器默认样式
import '@/assets/css/reset.css';
// element-plus样式
import 'element-plus/dist/index.css';
// 引入element-plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import print from 'vue3-print-nb';
import 'vant/es/notify/style';
import 'vant/lib/index.css';


const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(print);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

// 路由加载完毕再渲染页面
router.isReady().then(() => {
    app.mount('#app');
    // 重新加载当前路由
    router.replace(router.currentRoute.value.fullPath)
});
