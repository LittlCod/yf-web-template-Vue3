import request from "@/utils/request.js";

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

export function getMenu(data) {
    return request({
        url: 'menu.json',
        method: 'get',
        params: data
    });
}