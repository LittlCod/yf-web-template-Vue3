import axios from 'axios';
import { ElMessageBox, ElMessage } from 'element-plus';
import { getToken, removeToken } from '@/utils/auth';

// 创建axios实例
const service = axios.create({
    // baseURL: 'http://120.26.107.237:8000/jgranary',
    baseURL: 'http://192.168.1.102:8099/jgranary',
    // baseURL: 'http://localhost:8099/jgranary',
    // baseURL: getIp()+'/groupman',// api的base_url
    timeout: 60000 // 请求超时时间
});

export function getIp() {
    // 获取当前页面地址，如http://localhost:8090/admin/index
    let wPath = window.document.location.href;
    if (wPath.indexOf("localhost") >= -1 || wPath.indexOf("192.168.11.199") >= -1) {
        console.log("=====wPath=====",wPath);
        let port = '8092';
        if (wPath.indexOf("localhost") >= -1 || wPath.indexOf("192.168.11.199") >= -1) {
            port = '8082';
        }
        let pos = 0;
        if(wPath.indexOf("8090")>-1){
            port = wPath.indexOf("8090");
        }else if(wPath.indexOf("8080")>-1) {
            pos = wPath.indexOf("8080");
        }else if(wPath.indexOf("8081")>-1) {
            pos = wPath.indexOf("8081");
        }

        // 获取主机地址，如：http://localhost:8080
        let localhostPath = wPath.substring(0, pos);
        console.log(localhostPath+port)
        console.log(localhostPath)
        return localhostPath+port;
    }else{
        return '123.55.77.83:8092'
    }

}

// request拦截器
service.interceptors.request.use(config => {
    config.headers['accessToken'] = getToken() === undefined ? '' : getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    config.headers['Cache-Control'] = 'no-cache';
    config.headers['Pragma'] = 'no-cache';
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        /**
        * code为非200是抛错 可结合自己业务进行修改
        */
        // 导出
        if (response.headers['content-type'].indexOf('application/json') == -1) {
            return response;
        }
        const res = response.data;
        if (res.code !== 0) {
            ElMessage({
                message: res.message,
                showClose: true,
                type: 'error',
                duration: 6 * 1000,
                dangerouslyUseHTMLString: true
            });

            // 401:未登录;
            if (res.code === 403) {
                console.log(res.code)
                ElMessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    removeToken();
                    location.reload();// 为了重新实例化vue-router对象 避免bug
                })
            }
            return Promise.reject('error');
        } else {
            return response.data;
        }
    },
    error => {
        // 403:未登录;
        if (error.response.data.code === 403) {
            ElMessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                removeToken();
                location.reload();// 为了重新实例化vue-router对象 避免bug
            });
            return Promise.reject('error');
        } else {
            ElMessage({
                message: error.response.data.message,
                type: 'error',
                showClose: true,
                duration: 3 * 1000
            });
            return Promise.reject(error);
        }
    }
)

export default service;
