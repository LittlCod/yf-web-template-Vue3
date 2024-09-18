
const routes = [
    {
        path: '/',
        redirect: '/layout'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("@/views/LoginView.vue"),
        meta: { title: '登录', icon: '' }
    },
    {
        path: '/layout',
        name: 'layout',
        component: () => import("@/views/LayoutView.vue"),
        meta: { title: '首页', icon: '' },
        redirect: '/layout/home',
        children: [
            {
                path: 'home',
                name: 'home',
                meta: { title: '首页', icon: '' },
                component: () => import("@/views/HomeView.vue"),
            }
        ]
    },

    {
        name: '404',
        path: '/:catchAll(.*)',
        component: () => import(`@/views/404.vue`)
    }

];

export default routes;
