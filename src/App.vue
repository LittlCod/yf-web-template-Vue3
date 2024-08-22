<template>
  <!-- 本地化，把element-plus语言换成中文 -->
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup>
import { defineComponent } from "vue";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

const locale = zhCn;
</script>

<style lang="scss">
// 空着即可，用于生效全局scss
div{}
</style>