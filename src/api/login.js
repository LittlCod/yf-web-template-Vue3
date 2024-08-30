import request from "@/utils/request.js";

// 登录
export function login(username, password) {
    return request({
        url: 'login.json',
        method: 'post',
        data: {
            username,
            password
        }
    });
}

// 获取菜单

export function getMenu(data) {
    return request({
        url: 'menu.json',
        method: 'get',
        params: data
    });
}

// 修改密码
export function changePassword(data) {
    return request({
        url:'changePassword.json',
        method: 'post',
        data: data
    });
}