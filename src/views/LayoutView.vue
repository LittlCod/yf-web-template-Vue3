<template>
	<div class="layout">
		<div class="common-layout">
			<el-container class="flex-c" style="height: 100vh;">
				<el-header class="header yf-bg-container yf-textcolor">
					<div class="logo yf-textcolor" :class="mainStore.leftMenuCollapse ? 'collapse' : ''">
						<img src="@/assets/vue.svg" alt="logo" />
						<span v-show="!mainStore.leftMenuCollapse">模板项目页面</span>
					</div>
					<el-icon class="collapse-icon pointer"
						@click="mainStore.leftMenuCollapse = !mainStore.leftMenuCollapse">
						<component :is="'Expand'" v-if="mainStore.leftMenuCollapse"></component>
						<component :is="'Fold'" v-else></component>
					</el-icon>
					<!-- 顶部菜单 -->
					<el-menu :default-active="activeIndex" class="el-menu-top" mode="horizontal" @select="handleSelect">
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
				<el-container class="page yf-bg-container yf-textcolor">
					<el-aside class="aside" :class="mainStore.leftMenuCollapse ? 'collapse' : ''">
						<el-menu class="left-menu" style="height: 100%;" :collapse="mainStore.leftMenuCollapse"
							:unique-opened="true" active-color="#3471FF" router>
							<!-- 菜单组件，递归 -->
							<NavMenu :menus="userStore.menu"></NavMenu>
						</el-menu>
					</el-aside>
					<el-container>
						<el-main>
							<router-view></router-view>
						</el-main>
						<el-footer class="footer">
							Copyright © 2023 ccai.com.cn All Rights Reserved.  豫ICP备2023002658号-1  豫公网安备 41019702003271号
						</el-footer>
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
import NavMenu from "../components/LayoutItems/NavMenu.vue";
import { useMain } from '@/store/modules/main.js';
import { useUser } from '@/store/modules/user.js';

const mainStore = useMain();
const userStore = useUser();

const activeIndex = ref("1");
const activeIndex2 = ref("1");
const showSetting = ref(false);
const handleSelect = (key, keyPath) => {
	console.log(key, keyPath);
};
</script>

<style scoped lang='scss'>
.el-menu-top {
	// 宽度自动充满剩余的空间
	flex-grow: 1;
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
		width: 200px;
		box-sizing: border-box;

		img {
			height: 28px;
		}

		span {
			// 文字不换行
			white-space: nowrap;
			margin-left: 10px;
		}
	}
}

.page {
	flex-grow: 1;
	overflow: auto;

	.aside {}
}

.left-menu {
	height: 100%;
	overflow: auto;
}

:deep(.el-drawer__header) {
	margin-bottom: 0;
}

.footer {
	height: 26px;
	background-color: rgba(0, 0, 0, 0.3);
	border-top: 1px solid #fff;
	color: #fff;
	line-height: 25px;
	text-align: center;
	box-sizing: border-box;
	font-size: 12px;
}


// 左侧菜单折叠
$collapse: 65px;
$default: 200px;

.aside,
.logo {
	width: $default;
	transition: width .3s;
	overflow: hidden;

	&.collapse {
		width: $collapse;
	}
}

.collapse-icon {
	font-size: 20px;
	padding: 0 10px;
}
</style>