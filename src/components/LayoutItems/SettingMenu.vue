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
		{{ userStore }}

		<el-button class="yf-btn-primary" @click="mainStore.changeTheme('light')">light</el-button>
		<button class="yf-btn-primary">主要</button>
		<el-button class="yf-btn-primary" @click="mainStore.changeTheme('dark')">dark</el-button>
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
	grid-template-columns: 1fr;
	gap: 15px;

	.card-content {
		display: grid;
		grid-template-columns: 50px 1fr;
		grid-template-rows: 1fr 20px;
		gap: 15px;
		align-items: center;
	}
}
</style>