<template>
	<div class="setting-menu">
		<!-- 系统设置：用户名、修改密码、主题、菜单风格 -->
		<!-- 用户界面 -->
		<el-card class="yf-card">
			<div class="card-content">
				<el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
				<div class="user-info">
					<el-descriptions>
						<el-descriptions-item label="用户名">{{
							userStore.username
						}}</el-descriptions-item>
						<el-descriptions-item label="角色">{{
							userStore.role
						}}</el-descriptions-item>
					</el-descriptions>
				</div>
				<div class="name">{{ userStore.name }}</div>
				<div class="grid c-2">
					<el-button>修改密码</el-button>
					<el-button @click="logout">退出登录</el-button>
				</div>
			</div>
		</el-card>

		<el-divider />

		<!-- 设置选项 -->
		<div class="grid gap-5 ai-c ji-c setting">
			<div class="label">深色模式</div>
			<el-switch v-model="mainStore.theme" size="large" active-text="深色模式" inactive-text="浅色模式"
				active-value="dark" inactive-value="light" />
			<div class="label">菜单模式</div>
			<el-select v-model="mainStore.menuType" style="width: 200px">
				<el-option label="左侧菜单模式" value="left" />
				<el-option label="顶部菜单模式" value="top" />
				<el-option label="顶部+左侧菜单模式" value="all" />
			</el-select>
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
import { useMain } from "@/store/modules/main.js";
import { useUser } from "@/store/modules/user.js";
import { removeToken } from "@/utils/auth.js";
const mainStore = useMain();
const userStore = useUser();

// 退出登录
function logout() {
	removeToken();
	location.reload(); // 为了重新实例化vue-router对象 避免bug
}
</script>

<style scoped lang='scss'>
.setting-menu {
	display: grid;
	justify-items: stretch;
	grid-template-columns: 1fr;
	gap: 0px;

	.card-content {
		display: grid;
		grid-template-columns: 50px 1fr;
		grid-template-rows: 1fr 20px;
		align-items: center;
		gap: 15px;
		align-items: center;
	}

	:deep(.el-descriptions__cell) {
		padding-bottom: 0 !important;
	}

	.setting {
		grid-template-columns: 100px auto;
	}

}
</style>