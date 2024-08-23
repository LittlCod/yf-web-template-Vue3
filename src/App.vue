<template>
    <div id="app" :class="themeClass">
        <div class="them-title">11</div>
        <!-- 本地化，把element-plus语言换成中文 -->
        <el-config-provider :locale="locale">
            <router-view></router-view>
        </el-config-provider>
	</div>
</template>

<script setup>
import { computed } from "vue";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import { useMain } from '@/store/modules/main.js';

const mainStore = useMain();

const locale = zhCn;

let themeClass = computed(() => {
    console.log(mainStore.theme);
    return `theme-${mainStore.theme}`;
});
</script>

<style lang="scss">
// 空着即可，用于生效全局scss
div {
}
</style>