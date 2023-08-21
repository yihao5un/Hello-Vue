import Vue from 'vue'
import App from './App.vue'
// ES6 解构 按需引入
// import { Row, Button, Container, Header, Main, Aside, Menu, Submenu } from 'element-ui';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import './api/mock'
import Cookie from 'js-cookie'

Vue.config.productionTip = false

// 将Element中的组件全局注入到Vue中 之后就可以使用el标签了
Vue.use(ElementUI)

// 按需引入 为了在项目打包过程中减小项目的体积
// Vue.use(Row)
// Vue.use(Button)
// Vue.use(Container)
// Vue.use(Header)
// Vue.use(Main)
// Vue.use(Aside)
// Vue.use(Menu)
// Vue.use(Submenu)

// 添加全局前置导航守卫
router.beforeEach((to, from, next) => {
  // 判断token是否存在
  const token = Cookie.get('token') 
  // token 不存在 说明当前用户未登录 应该跳转到首页
  if (!token && to.name !== 'login') {
    next({ name: 'login'})
  } else if(token && to.name === 'login') {
    // token 存在并且当前页面是登陆页面的话 说明用户登陆 此时跳转至首页
    next({name: 'home'})
  } else {
    next();
  }
})

new Vue({
  router,
  store, // 创建好了store并且挂载到了vue实例上
  render: h => h(App),
  created() {
    store.commit('addMenu', router)    
  }
}).$mount('#app')
