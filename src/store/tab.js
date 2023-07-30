export default {
    state: {
        // 用于控制菜单的展开还是收起
        isCollapse: false,
        // 面包屑数据
        tabList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            }
        ],
    },
    // 在 Vuex 中 store 数据改变的唯一方法就是提交 mutations。mutations里面装着一些改变数据方法的集合，这是Vuex 设计很重要的一点，就是把处理数据逻辑方法全部放在 mutations 里面，使得数据和视图分离。
    mutations: {
        // 修改菜单展开收起的方法
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        // TODO 更新面包屑数据 点击两次会报错
        selectMenu(state, val) {
            // 1. 判断添加的数据是否为首页
            if (val.name !== 'home') {
                const index = state.tabList.findIndex(item => item.name === val.name)
                // 如果不存在
                if (index === -1) {
                    state.tabList.push(val)
                }
            }
        },
        // 删除指定的Tag数据
        closeTag(state, item) {
            const index = state.tabList.findIndex(val => val.name === item.name)
            state.tabList.splice(index, 1)
        }
    }
}