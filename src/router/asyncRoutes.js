const asyncRoutes = [
    {
        path: '/menu',
        name: 'menu',
        component: () => import("@/views/LayoutView.vue"),
        meta: { title: '菜单展示', icon: 'Tickets' },
        redirect: '/menu/menu1',
        children: [
            {
                path: 'menu1',
                name: 'menu1',
                meta: { title: '菜单展示1', icon: 'Pear' },
                component: () => import("@/views/HomeView.vue"),
            },
            {
                path:'menu2',
                name:'menu2',
                meta: { title: '菜单展示2', icon: 'Sugar' },
                children: [
                    {
                        path:'menu2-1',
                        name:'menu2-1',
                        meta: { title: '菜单展示2-1', icon: 'Bowl' },
                        component: () => import("@/views/HomeView.vue"),
                    },
                    {
                        path:'menu2-2',
                        name:'menu2-2',
                        meta: { title: '菜单展示2-2', icon: 'Apple' },
                        component: () => import("@/views/HomeView.vue"),
                    },
                ]
            },
            {
                path:'menu3',
                name:'menu3',
                meta: { title: '菜单展示3', icon: 'Dish' },
                component: () => import("@/views/HomeView.vue"),
                children: [
                    {
                        path:'menu3-1',
                        name:'menu3-1',
                        meta: { title: '菜单展示3-1', icon: 'Bowl' },
                        component: () => import("@/views/HomeView.vue"),
                    },
                    {
                        path:'menu3-2',
                        name:'menu3-2',
                        meta: { title: '菜单展示3-2', icon: 'Apple' },
                        component: () => import("@/views/HomeView.vue"),
                        children: [
                            {
                                path:'menu3-2-1',
                                name:'menu3-2-1',
                                meta: { title: '菜单展示3-2-1', icon: 'Bowl' },
                                component: () => import("@/views/HomeView.vue"),
                            },
                        ]
                    },
                ]
            },
        ]
    },
    {
        path: '/table',
        name: 'table',
        component: () => import("@/views/LayoutView.vue"),
        meta: { title: '表格展示', icon: 'Tickets' },
        redirect: '/table/basic',
        children: [
            {
                path: 'basic',
                name: 'table-basic',
                meta: { title: '基本表格', icon: 'Tickets' },
                component: () => import("@/views/Table/BasicTable.vue"),
            },
        ],
    },

];

export default asyncRoutes;
