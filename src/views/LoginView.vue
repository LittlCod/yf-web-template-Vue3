<template>
    <div class="login">
        <div class="login-box">
            <div class="title">用户登录</div>
            <el-form ref="loginform" class="login-form grid c-2 ai-c pc-c" :rules="rules" :model="loginData">
                <el-form-item class="cspan-2" prop="username">
                    <el-input v-model="loginData.username" type="text" prefix-icon="User" placeholder="输入用户名" size="large"
                        @keydown.enter="toLogin"></el-input>
                </el-form-item>
                <el-form-item class="cspan-2" prop="password">
                    <el-input v-model="loginData.password" type="password" prefix-icon="Lock" @keydown.enter="toLogin"
                        placeholder="输入密码" size="large" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="loginData.savePassword" label="记住密码" size="large" />
                </el-form-item>
                <el-form-item>
                    <el-button style="width: 100%;" type="success" @click="toLogin(ruleform)">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted, onUnmounted, onBeforeUnmount, nextTick } from 'vue';
import { setToken } from '@/utils/auth.js';
import { useRouter } from 'vue-router';
import { useUser } from '@/store/modules/user.js';
import { ElMessage, ElMessageBox } from 'element-plus';
import { login } from "@/api/login.js";

const $router = useRouter();
const loginData = reactive({
    username: '',
    password: '',
    savePassword: false,
});
const loginform = ref(null);
const user = useUser();
const rules = reactive({
    username: { required: true, message: '请输入用户名', trigger: 'blur' },
    password: { required: true, message: '请输入密码', trigger: 'blur' },
});
async function toLogin() {
    if (!loginform) return;
    await loginform.value.validate(valid => {
        if (valid) {
            login(loginData.username, loginData.password).then(res => {
                // initGetIpFunc();
                if (res.code === 0) {
                    const data = res.data
                    const tokenStr = data.accessToken

                    let userInfo = {};
                    userInfo.id = data.id;
                    userInfo.name = data.name;
                    userInfo.username = data.username;
                    // userInfo.menu = data.pageStr;

                    user.initUser(userInfo);
                    setToken(tokenStr);
                    $router.push('/layout');
                    
                    ElMessage({
                        message: '登陆成功！',
                        type: 'success'
                    });
                } else {
                    ElMessage({
                        type: "error",
                        message: res.data.message,
                    });
                }
            }).catch(() => {
                ElMessage({
                    type: "error",
                    message: "登陆失败",
                });
            });;
        } else {
            ElMessage({
                message: '请填写完整！',
                type: 'error'
            })
        }
    });
}
</script>

<style lang="scss">
.login {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: url(/src/assets/img/bg.jpg) center center no-repeat;
    background-size: 100% auto;
    

    .login-box {
        // 水平垂直居中
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);

        padding: 0 20px;
        border-radius: 10px;
        // 背景虚化
        backdrop-filter: blur(5px);
        box-shadow: #fff 1px 1px 25px;
        color: #fff;
        border: 2px #fff solid;


        .login-form {
            width: 320px;
            height: 220px;
            margin-top: 25px;
            row-gap: 5%;
        }

        .el-input__wrapper{
            background-color: transparent;
            svg{
                color: #fff;
            }
            input{
                color: #fff;
            }
        }

        .title {
            margin-top: 20px;
            font-size: 25px;
            text-align: center;
        }
    }
    
    .el-button{
        background-color: transparent;
        border: 2px #fff solid;
    }

    .el-checkbox__label{
        color: #fff;
    }
}
</style>
