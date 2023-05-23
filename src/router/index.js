import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

// 1. 创建路由组件
// 2. 将路由与组件进行映射
// 3. 创建router实例
const routes = [
    // 主路由
    {
        path: '/',
        component: Main,
        // 子路由
        children: [
            { path: 'home', component: Home },
            { path: 'user', component: User }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router