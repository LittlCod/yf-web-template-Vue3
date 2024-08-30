import { defineStore } from 'pinia';

// 保存用于全局的状态
export const useMain = defineStore('main', {
    state: () => {
        return {
            theme: 'light',
            menuType: 'all',
            leftMenuCollapse: false,
            refresh: true
        }
    },
    getters: {
    },
    actions: {
        changeTheme(val) {
            this.theme = val;
        },
        changeCollapse(val) {
            this.leftMenuCollapse = val;
        },
        getEquipment(val) {
            this.app = val;
        },
        setRefresh(val) {
            this.refresh = val;
        }
    },
    // 持久化缓存
    persist: true
});