<template>
	<div class="layout">
		<div class="common-layout">
			<el-container style="height: 100vh;">
				<el-header class="header yf-bg-container yf-textcolor">
					<div class="logo yf-textcolor">
						<img src="@/assets/vue.svg" alt="logo" />模板项目页面
					</div>
					<!-- 顶部菜单 -->
					<el-menu :default-active="activeIndex" class="el-menu-top yf-topmenu" mode="horizontal"
						@select="handleSelect">
						<el-menu-item index="1">Processing Center</el-menu-item>
						<el-sub-menu index="2">
							<template #title>Workspace</template>
							<el-menu-item index="2-1">item one</el-menu-item>
							<el-menu-item index="2-2">item two</el-menu-item>
							<el-menu-item index="2-3">item three</el-menu-item>
							<el-sub-menu index="2-4">
								<template #title>item four</template>
								<el-menu-item index="2-4-1">item one</el-menu-item>
								<el-menu-item index="2-4-2">item two</el-menu-item>
								<el-menu-item index="2-4-3">item three</el-menu-item>
							</el-sub-menu>
						</el-sub-menu>
						<el-menu-item index="3" disabled>Info</el-menu-item>
						<el-menu-item index="4">Orders</el-menu-item>
						<!-- <TopMenu class="right-menu"></TopMenu> -->
					</el-menu>

					<!-- 设置 -->
					<div class="right">
						<el-icon class="pointer">
							<Bell />
						</el-icon>
						<el-icon class="pointer" @click="showSetting = true">
							<Setting />
						</el-icon>
					</div>
					<!-- 顶部菜单结束 -->
				</el-header>
				<el-container style="height: 100%;" class="yf-bg-container yf-textcolor">
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

		<el-drawer class="yf-bg-container yf-textcolor" v-model="showSetting" title="系统设置">
			<SettingMenu></SettingMenu>
		</el-drawer>
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
import SettingMenu from "@/components/LayoutItems/SettingMenu.vue";

const activeIndex = ref("1");
const activeIndex2 = ref("1");
const showSetting = ref(false);
const handleSelect = (key, keyPath) => {
	console.log(key, keyPath);
};
</script>

<style scoped lang='scss'>
.el-menu-top {
	width: 100%;
	height: 65px;
	border-bottom: 0;
}

.header {
	height: 64px;
	padding: 0;
	font-size: 14px;
	font-weight: 500;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	border-bottom: 1px solid #dcdfe6;

	.right {
		width: 100px;
		font-size: 24px;
		text-align: left;

		>* {
			margin: 0 5px;
		}
	}

	.logo {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		line-height: 64px;
		color: #409eff;
		width: 200px;
		box-sizing: border-box;

		img {
			height: 28px;
			margin-right: 5px;
		}
	}
}

:deep(.el-drawer__header) {
	margin-bottom: 0;
}
</style>