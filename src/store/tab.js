export default {
    state: {
        // 用于控制菜单的展开还是收起
        isCollapse: false 
    },
    // 在 Vuex 中 store 数据改变的唯一方法就是提交 mutations。mutations里面装着一些改变数据方法的集合，这是Vuex 设计很重要的一点，就是把处理数据逻辑方法全部放在 mutations 里面，使得数据和视图分离。
    mutations: {
        // 修改菜单展开收起的方法
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        }
    }
}