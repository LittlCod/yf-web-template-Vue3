
const routes = [
    {
        path: '/',
        redirect: '/layout'
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
        path: '/404',
        meta: {
            title: '404',
        },
        component: () => import('@/views/404.vue')
    }

];

export default routes;
