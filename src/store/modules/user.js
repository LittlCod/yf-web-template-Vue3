import { defineStore } from 'pinia';

// 保存当前用户的状态
export const useUser = defineStore('user', {
    // 存储全局状态
    state: () => {
        return {
            username: '',
            name: '',
            id: null,
            menu: []
        }
    },
    // 封装计算属性
    getters: {
    },
    // 函数
    actions: {
        initUser(userInfo){
            const { username, name, id } = userInfo;
            this.username = username;
            this.name = name;
            this.id = id;
        },
        setMenu(menu){
            this.menu = menu;
        }
    },
    // 持久化缓存
    persist: true
});