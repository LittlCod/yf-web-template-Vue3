<template>
	<div class="setting-menu">
		<!-- 系统设置：用户名、修改密码、主题、菜单风格 -->
		<!-- 用户界面 -->
		<el-card class="lc-card">
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
					<el-button @click="showChangePassword = true">修改密码</el-button>
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

		<el-dialog v-model="showChangePassword" title="修改密码" width="400">
			<el-form ref="passwordFormRef" :rules="passwordRules" :model="passwordForm" label-width="120px">
				<el-form-item label="输入原密码" prop="originalPassword">
					<el-input type="password" v-model="passwordForm.originalPassword" autocomplete="off" />
				</el-form-item>
				<el-form-item label="输入修改密码" prop="password">
					<el-input type="password" v-model="passwordForm.password" autocomplete="off" />
				</el-form-item>
				<el-form-item label="确认修改密码" prop="confirmPassword">
					<el-input type="password" v-model="passwordForm.confirmPassword" autocomplete="off" />
				</el-form-item>
				<el-button type="primary" @click="changePasswordFn(passwordForm, passwordFormRef)">确认修改</el-button>
			</el-form>
		</el-dialog>
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
import { ElMessage } from 'element-plus';
import { changePassword } from "@/api/login.js";
const mainStore = useMain();
const userStore = useUser();
const passwordFormRef = ref();


// 退出登录
function logout() {
	removeToken();
	location.reload(); // 为了重新实例化vue-router对象 避免bug
}

// 修改密码
const showChangePassword = ref(false);
const passwordForm = ref({
	id: userStore.id,
	originalPassword: "",
	password: "",
	confirmPassword: "",
});
const passwordRules = {
	originalPassword: [
		{ required: true, message: "请输入原密码", trigger: "blur" },
	],
	password: [
		{ required: true, message: "请输入新密码", trigger: "blur" },
	],
	confirmPassword: [
		{ required: true, message: "请确认新密码", trigger: "blur" },
		{
			validator: (_, value) => {
				if (value === "") {
					return Promise.reject("请确认新密码");
				} else if (value!== passwordForm.value.password) {
					return Promise.reject("两次输入的密码不一致");
				}
				return Promise.resolve();
			},
		},
	],
}
const changePasswordFn = async (data, el) => {
	if(!el) return;
	await el.validate((valid) => {
		if (valid) {
			changePassword(data).then(res => {
				if (res.code === 0) {
					ElMessage.success("修改成功，请重新登录");
					showChangePassword.value = false;
					logout();
				}
			});
		}
	});
};
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