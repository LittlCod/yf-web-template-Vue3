<template>
	<div class="layout">
		<div class="common-layout">
			<el-container class="flex-c" style="height: 100vh;">
				<el-header class="header yf-bg-container yf-textcolor">
					<div class="logo yf-textcolor" :class="mainStore.leftMenuCollapse ? 'collapse' : ''">
						<img src="@/assets/vue.svg" alt="logo" />
						<span v-show="!mainStore.leftMenuCollapse">模板项目页面</span>
					</div>
					<el-icon v-if="mainStore.menuType !== 'top'" class="collapse-icon pointer"
						@click="mainStore.leftMenuCollapse = !mainStore.leftMenuCollapse">
						<component :is="'Expand'" v-if="mainStore.leftMenuCollapse"></component>
						<component :is="'Fold'" v-else></component>
					</el-icon>
					<!-- 顶部菜单 -->
					<el-menu v-if="mainStore.menuType !== 'left'"
						:default-active="mainStore.menuType === 'all' ? baseUrl : route.path" class="el-menu-top"
						mode="horizontal" @select="handleSelect" router>
						<!-- 菜单组件，递归 -->
						<NavMenu :menus="topMenu"></NavMenu>
					</el-menu>
					<!-- 顶部菜单不展示时，展示面包屑导航 -->
					<el-breadcrumb class="el-menu-top" separator="/" v-else>
						<el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
						<el-breadcrumb-item v-for="item in route.matched.filter(i => i.meta.title !== '首页')" :key="item.name">
							{{ item.meta.title }}
						</el-breadcrumb-item>
					</el-breadcrumb>
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
					<el-aside v-if="mainStore.menuType !== 'top'" class="aside"
						:class="mainStore.leftMenuCollapse ? 'collapse' : ''">
						<el-menu class="left-menu" style="height: 100%;" :collapse="mainStore.leftMenuCollapse"
							:default-active="route.path" :unique-opened="true" active-color="#3471FF" router>
							<!-- 菜单组件，递归 -->
							<NavMenu :menus="leftMenu" :baseUrl="mainStore.menuType === 'all' ? baseUrl + '/' : ''">
							</NavMenu>
						</el-menu>
					</el-aside>
					<el-container>
						<el-main>
							<router-view></router-view>
						</el-main>
						<el-footer class="footer">
							Copyright © 2023 ccai.com.cn All Rights Reserved. 豫ICP备2023002658号-1 豫公网安备 41019702003271号
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
const route = useRoute();

const activeIndex = ref("1");
const activeIndex2 = ref("1");

// 右侧抽屉开关 - 主设置
const showSetting = ref(false);

// 基本baseUrl，作为顶部菜单的active与左侧菜单的匹配项
const baseUrl = computed(() => {
	return route.matched[0].path;
});

// 菜单模式修改 - 左侧菜单
let leftMenu = computed(() => {
	let menu = userStore.menu;
	switch (mainStore.menuType) {
		case "top":
			menu = [];
			break;
		case "all":
			const currentMenu = menu.find(item => item.path === baseUrl.value);
			console.log(currentMenu);
			if (currentMenu && currentMenu.children)
				menu = currentMenu.children;
			else
				menu = [];
			break;
	};
	return menu;
});

// 菜单模式修改 - 顶部菜单
const topMenu = computed(() => {
	let menu = userStore.menu;
	switch (mainStore.menuType) {
		case "left":
			menu = [];
			break;
		case "all":
			menu = menu.map(item => {
				return {
					...item,
					children: null
				}
			});
			// console.log(menu);
			break;
	};
	return menu;
});

// 顶部菜单点击事件
const handleSelect = (key, keyPath) => {
	if (mainStore.menuType === 'all') {
		// console.log(key, keyPath);
	}
};
</script>

<style scoped lang='scss'>
.el-menu-top {
	// 宽度自动充满剩余的空间
	flex-grow: 1;
	height: 65px;
	line-height: 65px;
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