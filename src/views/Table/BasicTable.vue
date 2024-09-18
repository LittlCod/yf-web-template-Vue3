<template>
    <div class="basic-table">
        <div class="title">使用tableData直接传递数据</div>
        <LcTable :tableData="[{date:1,name:2,address:3, gander: '男'}]">
            <el-table-column prop="date" label="日期" width="180" />
            <el-table-column prop="name" label="姓名" width="180" />
            <el-table-column prop="address" label="地址" />
            <el-table-column prop="gander" label="性别" width="180" />
        </LcTable>
        
        <div class="title">使用tableUrl请求数据</div>
        <LcTable tableUrl="/tableData.json">
            <el-table-column prop="id" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="age" label="Address" />
        </LcTable>
    </div>
</template>

<script setup>
import { defineComponent, ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LcTable from '@/components/LcTable/index.vue'

</script>

<style scoped lang='scss'>
.title{
    font-size: 20px;
    color: #000;
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;
    &:not(:first-child){
        margin-top: 20px;
    }
}
</style>