import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'

Vue.use(Vuex)

// 创建vuex的实例 并暴露 是为了挂载在Vue实例上
export default new Vuex.Store({
    modules: {
        tab // 引入tab
    }
})