import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";

import Vant from 'vant';
import {Toast} from "vant";
import { ActionSheet } from 'vant';
import { Tab, Tabs } from 'vant';
import { List } from 'vant';

import Login from "@/pages/Login.vue"
import Registered from "@/pages/Registered.vue"
import Admin from "@/pages/Admin.vue"
import Edit from "@/pages/Edit.vue"
import Myfollow from "@/pages/Myfollow.vue"
import Mycomment from "@/pages/Mycomment.vue"


import Index from "@/pages/Index.vue"

import App from "@/App"

Vue.use(VueRouter)
Vue.use(Vant)
Vue.use(ActionSheet);
Vue.use(Tab).use(Tabs);
Vue.use(List);
// 绑定到原型
Vue.prototype.$axios = axios;

axios.defaults.baseURL = "http://localhost:3000"

const routes = [
    {path: "/login",component: Login},
    {path: "/register",component: Registered},
    {path: "/admin",component: Admin},
    {path: "/edit",component: Edit},
    {path: "/myfollow",component: Myfollow},
    {path: "/mycomment",component: Mycomment},
    {path: "/",component: Index},
]

const router = new VueRouter({
    routes
})

router.beforeEach((to,from,next)=>{
    const token = localStorage.getItem("token")

    if(to.path === "/admin"|| to.path ==="/edit" ||to.path ==="/myfollow" ||to.path ==="/mycomment"){
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