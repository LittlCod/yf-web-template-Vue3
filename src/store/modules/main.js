import { defineStore } from 'pinia';

// 保存用于全局的状态
export const useMain = defineStore('main', {
    state: () => {
        return {
            leftMenuCollapse: false,
            refresh: true
        }
    },
    getters: {
    },
    actions: {
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