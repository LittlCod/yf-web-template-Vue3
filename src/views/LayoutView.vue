<template>
	<div class="layout">
		<div class="common-layout">
			<el-container>
				<el-header class="header them-title">
                    <div class="logo">
                        <img src="@/assets/vue.svg" alt="logo">模板项目页面
                    </div>
                    menu
                    <el-button @click="mainStore.changeTheme('light')">light</el-button>
                    <el-button @click="mainStore.changeTheme('dark')">dark</el-button>
                </el-header>
				<el-container>
					<el-aside width="200px">Aside</el-aside>
					<el-container>
						<el-main>
		                    <router-view></router-view>
                        </el-main>
						<el-footer>Footer</el-footer>
					</el-container>
				</el-container>
			</el-container>
		</div>
	</div>
</template>
        
<script setup>
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
import { useMain } from '@/store/modules/main.js';
const mainStore = useMain();
</script>
        
<style scoped lang='scss'>
.header{
    // background-color: var(--topmenu-background);
    height: 64px;
    padding: 0 16px;
    // color: var(--topmenu-color);
    font-size: 14px;
    font-weight: 500;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dcdfe6;
    .logo{
        float: left;
        font-size: 21px;
        // padding: 0 15px;
        line-height: 64px;
        color: #409EFF;
        width: 200px;
        box-sizing: border-box;
        img{
            height: 31px;
            float: left;
            margin-right: 10px;
            margin-top: 9px;
        }
    }
}
</style>