<template>
    <div class="lc-table">
        <el-table border :data="showTableData" style="width: 100%">
            <slot></slot>
        </el-table>
    </div>
</template>

<script setup>
import { defineComponent, ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import request from "@/utils/request.js";

const props = defineProps({
    tableUrl: {
        type: String,
        default: '',
    },
    requestMethod: {
        type: String,
        default: 'get',
    },
    requestData: {
        type: Object,
        default: () => {
            return {}
        },
    },
    dataHandleFn: {
        type: Function,
        default: data => {
            return data
        },
    },
    tableData: {
        type: Array,
        default: () => [],
    }
});

// 展示的表格数据
const showTableData = ref([]);
// 将表格数据赋值
const getTableData = (type, reset) => {
    // reset为true时，清空表格数据重新赋值，否则直接追加数据
    if (reset) showTableData.length = 0;
    // 使用url请求数据
    if (type === 'url') {
        request({
            url: props.tableUrl,
            method: props.requestMethod,
            data: props.requestData,
        }).then(res => {
            // 使用dataHandleFn处理数据，默认不处理
            showTableData.value.push(...props.dataHandleFn(res.data));
        }).catch(err => {
            console.log(err);
        });
    // 通过父组件传递tableData直接添加数据
    } else if (type === 'data') {
        showTableData.value.push(...props.tableData);
    }
}

onMounted(() => {
    if (props.tableUrl) getTableData('url', true);
    if (props.tableData.length > 0) getTableData('data', true);
});

</script>

<style scoped lang='scss'></style>