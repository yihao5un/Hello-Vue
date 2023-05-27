<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <!-- 没有子菜单 -->
        <!-- :key 是唯一且固定的值 -->
        <!-- : 等价于 v-bind -->
        <h3>通用后台管理系统</h3>
        <el-menu-item @click="clickMenu(item)" v-for="item in noChildren " :key="item.name" :index="item.name">
            <!-- 图标 el-icon-menu 前面这些是不变的 然后进行拼接即可 -->
            <!-- `el-icon-${ item.icon }` 是ES6的语法 -->
            <!-- :class 表示的是动态class -->
            <i :class="`el-icon-${item.icon}`"></i>
            <!-- 菜单名称 -->
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <!-- 有子菜单 -->
        <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
            <template slot="title">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
                <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{ subItem.label }}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collap se) {
    width: 200px;
    min-height: 400px;
}

.el-menu {
    height: 100vh;

    h3 {
        color: #fff;
        text-align: center;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400px;
    }
}
</style>

<script>
export default {
    data() {
        return {
            isCollapse: false,
            menuData: [
                {
                    path: '/',
                    name: 'home',
                    label: '首页',
                    icon: 's-home',
                    url: 'Home/Home'
                },
                {
                    path: '/mall',
                    name: 'mall',
                    label: '商品管理',
                    icon: 'video-play',
                    url: 'MallManage/MallManage'
                },
                {
                    path: '/user',
                    name: 'user',
                    label: '用户管理',
                    icon: 'user',
                    url: 'UserManage/UserManage'
                },
                {
                    label: '其他',
                    icon: 'location',
                    children: [
                        {
                            path: '/page1',
                            name: 'page1',
                            label: '页面1',
                            icon: 'setting',
                            url: 'Other/PageOne'
                        },
                        {
                            path: '/page2',
                            name: 'page2',
                            label: '页面2',
                            icon: 'setting',
                            url: 'Other/PageTwo'
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        // 点击菜单跳转到对应的路由
        clickMenu(item) {
            // this 是vue实例 $router App.vue 已经引入了
            // 当页面路由与跳转的路由不一致的时候才允许跳转
            // $route 表示的是当前页面的路由 而$router表示的是整个的router实例
            if (this.$route.path !== item.path && !(this.$route.path === '/home' && (item.path === '/'))) {
                this.$router.push(item.path)
            }
        }
    },
    // 对数据进行过滤 然后v-for进行遍历
    computed: {
        // 1. 没有子菜单
        noChildren() {
            return this.menuData.filter(item => !item.children)
        },
        // 2. 有子菜单
        hasChildren() {
            return this.menuData.filter(item => item.children)
        }
    }
}
</script>