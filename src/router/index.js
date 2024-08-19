import { createRouter, createWebHistory } from 'vue-router';
// import VueRouter from 'vue-router';
import routes from './routes';
import { getToken } from '@/utils/auth' // 验权
import { ElLoading } from 'element-plus'; // 加载动画
import pinia from '../store';
import { useMain } from "@/store/modules/main.js";
import { useUser } from "@/store/modules/user.js";
import { getMenu } from "@/api/login.js";
import { handleMenu } from '@/utils/menu.js';

const whiteList = ['/login'];

const router = createRouter({
    // 指定路由模式
    history: createWebHistory(),
    // 路由地址
    routes: routes
});
// router.addRoute({
//     path: '/business/operation/salessummary',
//     name: 'business11',
//     component: () => import('@/views/LayoutView.vue'),
// });


let loading = null;

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    loading = ElLoading.service({
        lock: true,
        text: '正在加载',
        fullscreen: true
    });

    let appFlag = false;
    // console.log(useMain(pinia).app);
    if (useMain(pinia).app && to.matched[0].path !== '/app') {
        appFlag = true;
    }
    if (getToken()) {
        await getMenu().then(menu => {
            // const testMenu = [{ name: '业务管理' }, { name: '经营管理' }, { name: '商品销售汇总'}, {name: '门店管理'}, { name: '配送跟踪' }, { name: '会话管理' } ];
            // const newMenu = handleMenu(testMenu);
            const newMenu = handleMenu(menu.data);
            useUser(pinia).setMenu(newMenu);
            newMenu.forEach(item => {
                router.addRoute(item);
            });
            // 添加404页面
            router.addRoute({ path: '/:pathMatch(.*)*', redirect: '/404' });
        });
        if (to.path === '/login') {
            appFlag ? next({ path: '/' }) : next({ path: '/app' });
            if (loading) loading.close();
        } else if (appFlag) {
            next('/app');
        } else {
            next();
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next('/login');
            if (loading) loading.close();
        }
    }
    // next();
});

// 全局后置钩子
router.afterEach((to, from) => {
    if (loading) loading.close();
    const _title = to.meta.title
    if (_title) {
        window.document.title = _title
    }
});

// 路由重复点击时报错的解决
// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

export default router;
