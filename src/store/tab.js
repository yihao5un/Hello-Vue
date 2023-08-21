import Cookie from 'js-cookie'

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
        // 菜单数据 store中的state数据是存在浏览器的内存中的 注意页面刷新之后就不存在了！ 需要用cookie去做缓存
        menu: [
             
        ]
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
        },
        // 设置menu的数据
        setMenu(state, val) {
            state.menu = val;
            // Cookie 缓存 并序列化为字符串
            Cookie.set('menu', JSON.stringify(val))
        },
        // 动态注册路由
        addMenu(state, router) {
            // 判断当前缓存中是否有数据
            if (!Cookie.get('menu')) return 
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            // 组装动态路由的数据
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    // ... 是扩展运算符 会将内容展开push到里面的
            menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            })
        }
    }
}