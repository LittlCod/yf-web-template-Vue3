import { defineStore } from 'pinia';

// 保存多选框
export const useSelect = defineStore('select', {
    state: () => {
        return {
            selectedData: [],
        }
    },
    getters: {
    },
    actions: {
        // 表格中选中的数据
        selectedDataChange(row) {
            this.selectedData = row
        }
    },
});