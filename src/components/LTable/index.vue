<template>
    <div class="table p-20 search-table">
        <!-- {{ tableData }} -->
        <!-- 顶部搜索 -->
        <el-form style="width: 100%" v-if="setting.search === undefined || setting.search">
            <!-- 搜索栏插槽 -->
            <slot name="search" :data="searchData">
                <template v-for="(rowItem, rowIndex) in searchList" :key="rowIndex">
                    <el-row :gutter="10">
                        <template v-for="(item, index) in rowItem" :key="index">
                            <el-col v-if="item.type" :xs="item.xs || item.md === 0 ? item.xs : 24"
                                :sm="item.sm || item.md === 0 ? item.sm : 12" :md="item.md || item.md === 0 ? item.md : 8"
                                :lg="item.lg || item.md === 0 ? item.lg : 6" :xl="item.xl || item.md === 0 ? item.xl : 4">
                                <!-- <form-item :formData="searchData" :formOptions="item"></form-item>

                                <el-form-item v-if="item.type === 'button'">
                                    <el-button type="primary" @click="searchTable(searchData)">查询</el-button>
                                    <el-button @click="initSearchData">重置</el-button>
                                </el-form-item> -->
                            </el-col>
                        </template>
                    </el-row>
                </template>
            </slot>
        </el-form>

        <!-- 按钮组 -->
        <el-button-group>
            <template v-for="item in btnList" :key="item.name">
                <el-button class="btn-group" :type="item.type" :icon="item.icon"
                    :disabled="item.disabled === 'select' ? !isSelect : item.disabledFn ? item.disabledFn({ searchData, tableData }) : false"
                    @click="item.fn({ searchData, tableData })">{{ item.name }}
                </el-button>
            </template>

            <!--
      <el-button type="" icon="Refresh" @click="initTable">刷新</el-button>
-->
        </el-button-group>

        <!-- 表格 -->
        <div class="table-content mb-15">
            <div v-if="title" class="table-title">{{ title }}</div>
            <el-table max-height="700" :data="tableData" style="width: 100%" :border="true"
                @selection-change="handleSelectionChange">
                <el-table-column v-if="setting.selection === undefined || setting.selection" fixed="left" type="selection"
                    width="40" />
                <table-column-item v-for="(item, index) in tableHeaderList" :key="index" :item="item">
                    <!-- 插槽 -->
                    <template v-slot:[item.name]="{ row }">
                        <slot :name="item.name" :row="row"> </slot>
                    </template>
                </table-column-item>
            </el-table>
        </div>

        <el-pagination v-if="setting.page === undefined || setting.page" background
            layout="->, total, sizes, prev, pager, next" :current-page="formData.offset" :page-size="formData.limit"
            :page-sizes="[10, 20, 30]" @size-change="changeSize" @current-change="changePage"
            :total="tableOptions.total ? tableOptions.total : 0" />
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
// 多选框事件
import { useSelect } from "@/store/modules/main.js";
import request from "@/utils/request.js";
import TableColumnItem from "@/components/TableColumnItem/index.vue";
// import FormItem from "@/components/FormItem/index.vue";

const settingForm = reactive(useSelect());

const isSelect = ref(false);
let handleSelectionChange = (row) => {
    // console.log(row);
    if (row == "undefined") {
        row = [];
    }
    settingForm.selectedDataChange(row);
    if (row.length) {
        isSelect.value = true;
        return;
    }
    isSelect.value = false;
};
// 传过来的参数
const props = defineProps({
    // 搜索栏配置
    searchList: {
        type: Array,
        default: () => [],
    },
    setting: {
        type: Object,
        default: () => {
            return {
                selection: true,
                search: true,
                page: true
            }
        },
    },
    // 表头配置
    tableHeaderList: {
        type: Array,
        default: () => [],
    },
    // 按钮配置
    btnList: {
        type: Array,
        default: () => [],
    },
    // 表格数据接口
    searchUrl: {
        type: String,
        default: '',
    },
});

// 初始化搜索条件
const oldSearchList = computed(() => {
    let arr = [];
    props.searchList.forEach(item => {
        if (item instanceof Array) {
            arr.push(...item);
        }
    });
    return arr;
});

// 初始化搜索条件
const searchData = computed(() => {
    let obj = reactive({});
    oldSearchList.value.forEach((item) => {
        if (item.value) {
            obj[item.prop] = item.value;
        } else if (item.prop) {
            obj[item.prop] = null;
        }
    });
    return obj;
});

const tableData = ref([]);
const tableOptions = reactive({
    total: 0,
});
let formData = {
    offset: 1,
    limit: 10,
};

let title = ref("");

// 获取表格数据
const getTable = () => {
    if (!props.searchUrl) {
        return;
    }

    // 处理时间范围
    // const timerange = oldSearchList.value.find(item => {
    //     if (item.dateType) {
    //         return item.dateType === 'daterange' ||
    //             item.dateType === 'datetimerange' ||
    //             item.dateType === 'monthrange';
    //     }
    // });
    // console.log(timerange);

    // if (timerange && formData[timerange.prop] && (formData[timerange.prop] instanceof Array)) {
    //     formData[timerange.prop] = Array.from(formData[timerange.prop]).join(" 至 ");
    // }

    request({
        url: props.searchUrl,
        method: 'get',
        params: formData
    }).then(res => {
        console.log(res);
        if (res.code !== 0) {
            return;
        }
        tableOptions.total = res.data.total;
        tableData.value = [];
        tableData.value = res.data.rows || res.data.list;
        tableData.value = tableData.value.map(item => {
            let obj = numberToString(item);
            return obj;
        });

        if (res.data.title) {
            title.value = res.data.title;
        }
        if (res.data.titles) {
            handlePurchaseHead(res.data);
        }
    });
};

function numberToString(obj) {
    let newObj = {};

    for (let i in obj) {
        switch (Object.prototype.toString.call(obj[i])) {
            case '[object Number]':
                newObj[i] = obj[i].toString();
                break;
            case '[object Object]':
                newObj[i] = numberToString(obj[i]);
                break;
            case '[object Array]':
                newObj[i] = [];
                obj[i].forEach((item, index) => {
                    newObj[i][index] = numberToString(item);
                });
                break;
            default:
                newObj[i] = obj[i];
                break;
        }
    }

    return newObj;
}


// 条数
const changeSize = (val) => {
    formData = { ...formData, offset: 1, limit: val };
    getTable();
};
// 页数
const changePage = (val) => {
    formData = { ...formData, offset: val };
    getTable();
};
// 搜索
const searchTable = (data) => {
    formData = { ...formData, ...data };
    getTable();
};
// 刷新
const initTable = data => {
    formData = {
        ...formData,
        ...data
    };
    initSearchData();
    getTable();
};
// 重置
const initSearchData = () => {
    oldSearchList.value.forEach((item) => {
        searchData.value[item.prop] = null;
    });
    searchTable(searchData.value);
};

const dateOptions = ref({});
const setDateOptions = (prop, dateType) => {
    console.log(prop, dateType);
    let defaultTime = new Date(),
        format = 'YYYY-MM-DD',
        valueFormat = 'YYYY-MM-DD';
    switch (dateType) {
        case 'date':
            break;

        case 'daterange':
            defaultTime = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59),];
            valueFormat = 'YYYY-MM-DD HH:mm:ss';
            break;

        case 'monthrange':
            format = 'YYYY-MM'
            valueFormat = 'YYYY-MM';
            break;

        default:
            break;
    }
    dateOptions.value[prop] = { defaultTime, format, valueFormat };
    console.log(dateOptions);
};
const getDate = () => {
    return oldSearchList.value.filter(item => {
        if (item.dateType) {
            return item.type === 'date';
        }
    });
};

onMounted(() => {
    searchTable(searchData.value);
    const dateArr = getDate();
    if (dateArr.length > 0) {
        dateArr.forEach(item => {
            setDateOptions(item.prop, item.dateType);
        });
    }
});

// 暴露出来的方法
defineExpose({
    initTable,
    tableData
});
</script>

<style scoped lang='scss'>
.table {
    background-color: #fff;

    .table-content {
        margin-top: -14px;
        box-sizing: border-box;
        border: 1px solid #9ccdff;
    }

    .btn-group {
        margin-bottom: 22px;
        margin-top: 2px;
    }
}

.table-title {
    text-align: center;
    font-size: 20px;
    margin-bottom: 30px;
    margin-top: 10px;
}

.search-table .el-form-item {
    margin-bottom: 12px;
}

.el-button+.el-button {
    margin-left: 10px;
}
</style>
