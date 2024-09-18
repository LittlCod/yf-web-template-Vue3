<template>
    <div class="lc-table">{{ tableData }}
        <el-table border :data="tableData" style="width: 100%">
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

const showTableData = [];

onMounted(() => {
    if(props.tableUrl === '' || props.tableData.length > 0) return;
    console.log(1);
    request({
        url: props.tableUrl,
        method: props.requestMethod,
        data: props.requestData,
    }).then(res => {
        // console.log(props.dataHandleFn(1));console.log(res.data);
        props.tableData.push(...res.data);
        console.log(props.tableData);
    });
});

</script>

<style scoped lang='scss'></style>