import axios from 'axios'
import Vue from 'vue'

// 导入router
import router from '../router'
import { Message } from 'element-ui';

if(process.env.NODE_ENV== 'development'){
    //开发环境
    axios.defaults.baseURL = '/api'
}else{
    //生产环境
    axios.defaults.baseURL = 'http://localhost:3000/api'
}

// 全局url配置
axios.defaults.baseURL = 'http://localhost:3000/api'

// 请求拦截器
axios.interceptors.request.use(function(config){
    // 获取localStorage里面的对象
    let userInfo = JSON.parse(localStorage.getItem('userInfo')||'{}')
    config.headers.authorization = userInfo.token
    return config
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
    // if (response.data.code === 403) {
    //     Message({
    //         message: response.data.msg,
    //         type: "error",
    //     })
    //     router.push('/login')
    // }
    return response.data
})

// 挂载
Vue.prototype.$http = axios

// 导出
export default axios