import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
import Login from '../views/Login.vue'

// https://zhuanlan.zhihu.com/p/364708055
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

// 1. 创建路由组件
// 2. 将路由与组件进行映射
// 3. 创建router实例
const routes = [
    // 主路由
    {
        path: '/',
        component: Main,
        // 当路径是/的时候重定向到 Home
        redirect: '/home',
        // 子路由
        children: [
            { path: 'home', name: 'home', component: Home }, // 主页
            { path: 'user', name: 'user',component: User }, // 用户管理
            { path: 'mall', name: 'mall',component: Mall }, // 商品管理
            { path: 'page1', name: 'page1',component: PageOne }, // 子页面1
            { path: 'page2', name: 'page2',component: PageTwo }, // 子页面2
        ]
    },
    // 登录
    {
        path: '/login',
        name: 'login',
        component: Login
    }
]

const router = new VueRouter({
    routes
})

export default router
