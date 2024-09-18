<template>
    <!-- 多级表头 -->
    <el-table-column v-if="item.children" :label="item.label" :fixed="item.fixed" :align="item.align"
        :show-overflow-tooltip="item.tooltip" :header-align="item.headerAlign">
        <!-- 组件递归多级表头 -->
        <columnItem v-for="(citem, cindex) in item.children" :key="cindex" :item="citem"
            :show-overflow-tooltip="item.tooltip"></columnItem>
    </el-table-column>

    <!-- 使用插槽 -->
    <el-table-column v-else :label="item.label" :width="item.width" :min-width="item.minWidth" :fixed="item.fixed"
        :align="item.align" :show-overflow-tooltip="item.tooltip" :header-align="item.headerAlign" :sortable="item.sortable"
        :sort-method="item.sortMethod">
        <template #default="scope">
            <!-- 日期 -->
            <div v-if="item.type === 'date'">
                <el-icon v-if="scope.row[item.prop]">
                    <Clock />
                </el-icon>
                {{ formatDate(scope.row[item.prop], item.format) }}
            </div>

            <!-- 图片 -->
            <div v-else-if="item.type === 'img'">
                <img style="width: 100%" :src="scope.row[item.prop]" />
            </div>

            <!-- 按钮 -->
            <div v-else-if="item.type === 'btn'">
                <template v-for="kitem in item.btnList" :key="kitem.name">
                    <el-link v-if="kitem.showFn ? kitem.showFn(scope.row) : true" size="small"
                        :disabled="kitem.disabledFn ? kitem.disabledFn(scope.row) : false" :icon="kitem.icon"
                        :type="kitem.type" @click="kitem.fn ? kitem.fn(scope.row) : null" class="linkbtn mr-10">
                        {{ kitem.name }}
                    </el-link>
                </template>
            </div>

            <!-- tag标签 -->
            <div v-else-if="item.type === 'tag'">
                <el-tag :type="item.typeFn ? item.typeFn(scope.row) : ''"> {{ item.fn ? item.fn(scope.row) :
                    scope.row[item.prop] }} </el-tag>
            </div>

            <!-- 进度条 -->
            <div v-else-if="item.type === 'progress'">
                <el-progress :text-inside="true" :stroke-width="18"
                    :percentage="scope.row.process ? scope.row.process : 0" />
            </div>

            <!-- 插槽 -->
            <div v-else-if="item.type === 'slot'">
                <slot :name="item.name" :row="scope.row" :item="item" :index="scope.$index"></slot>
            </div>

            <!-- 处理后的数据或直接展示 -->
            <div class="overflow-omit-1" v-else>
                {{ item.fn ? item.fn(scope.row) : ((scope.row[item.prop] && scope.row[item.prop] != 0) ?
                    scope.row[item.prop] : '-') }}
            </div>
        </template>
    </el-table-column>
</template>

<script setup name="column-item">
import {
    defineComponent,
    ref,
    reactive,
    toRefs,
    onBeforeMount,
    onMounted,
    watchEffect,
    computed,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { formatDate } from "@/utils/date.js";
import columnItem from '@/components/TableColumnItem/index.vue';

const props = defineProps({
    item: {
        type: Object,
        default: () => {
            return { children: [] };
        },
    },
});

const progressColor = (percentage) => {
    switch (true) {
        case percentage <= 20:
            return "#f56c6c";
        case percentage <= 40:
            return "#e6a23c";
        case percentage <= 60:
            return "#909399";
        case percentage <= 80:
            return "#409EFF";
        case percentage <= 100:
            return "#67C23A";
        default:
            ElMessage({
                message: "进度条数据错误",
                type: "error",
            });
            break;
    }
};
</script>

<style scoped lang='scss'>
.linkbtn:last-child {
    margin-right: 0;
}
</style>
