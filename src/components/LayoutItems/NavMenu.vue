<template>
    <!-- 菜单（有子级菜单）-->
    <template v-for="(item) in menus">
 
        <el-sub-menu :index="item.name + ''" v-if="item.children && item.children.length > 0" :key="item.name">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.name }}</span>
            </template>
            <NavMenu :menus="item.children" :baseUrl="`${baseUrl}${item.path}/`">
            </NavMenu>
        </el-sub-menu>
        <!-- 菜单（没有子级菜单）-->
        <el-menu-item :index="baseUrl + item.path" :key="item.name + ''" v-else>
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            <template #title>
                <span>{{ item.name }}</span>
                <!-- <span>{{ baseUrl + item.path }}</span> -->
            </template>
        </el-menu-item>
 
    </template>
</template>
<script setup>
const props = defineProps({
    menus: {
        type: Array,
        default: () => [],
    },
    baseUrl: {
        type: String,
        default: '',
    }
});
</script>
<style scoped lang="scss">
</style>