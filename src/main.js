import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import Vant from 'vant';
import {Toast} from "vant";

import Login from "@/pages/Login.vue"
import Registered from "@/pages/Registered.vue"
import Admin from "@/pages/Admin.vue"


import App from "@/App"

Vue.use(VueRouter)
Vue.use(Vant)

// 绑定到原型
Vue.prototype.$axios = axios;

axios.defaults.baseURL = "http://localhost:3000"

const routes = [
    {path: "/login",component: Login},
    {path: "/register",component: Registered},
    {path: "/admin",component: Admin},
]

const router = new VueRouter({
    routes
})

router.beforeEach((to,from,next)=>{
    const token = localStorage.getItem("token")

    if(to.path === "/admin"){
        if(token){
            return next();
        }else{
            return next("/login")
        }
    }else{
        next()
    }
})


axios.interceptors.response.use(res=>{
    const {message, statusCode} = res.data
    if(statusCode === 401){
        Toast.fail(message)
    }
    if(message &&message=="用户信息验证失败"){
        router.push("/login")
    }
    return res;
},function(err){
    Toast.fail("服务器错误")
})

new Vue({
    el: '#app',
    router,
    render: function (createElement) {
        return createElement(App)
    }
})