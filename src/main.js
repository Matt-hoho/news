import Vue from "vue";
import VueRouter from "vue-router";
import Vant from 'vant';
import axios from "axios";


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

new Vue({
    el: '#app',
    router,
    render: function (createElement) {
        return createElement(App)
    }
})