<template>
    <div class="header-container">
        <div class="l-content">
            <el-button style="margin-right: 20px;" @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
            <!-- 面包屑 -->
            <!-- <span class="text">首页</span> -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label
                }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown @command="handleClick">
                <span class="el-dropdown-link">
                    <img class="user" src="../assets/images/user-default.png" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="cancel">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
// 辅助函数
import { mapState } from "vuex"
import Cookie from 'js-cookie'

export default {
    data() {
        return {}
    },
    methods: {
        handleMenu() {
            // this.$store 因为main.js中已经挂载到Vue实例了
            this.$store.commit('collapseMenu'); // 调用 mutations中的collapseMenu方法
        },
        handleClick(command) {
            if (command === 'cancel') {
                // 清除cookie中的token
                Cookie.remove('token')
                // 跳转到登陆页面
                this.$router.push('/login')
            }
        }
    },
    computed: {
        // ... 扩展运算符 将对象进行解构
        ...mapState({
            tags: state => state.tab.tabList
        })
    }
}
</script>
<style lang="less" scoped>
.header-container {
    padding: 0 20px;
    background-color: #333;
    height: 60px;
    // display:flex 意思是弹性布局，它能够扩展和收缩 flex 容器内的元素，以最大限度地填充可用空间
    display: flex;
    // 两侧居中
    justify-content: space-between;
    // 垂直居中
    align-items: center;

    // 面包屑样式
    .text {
        color: #fff;
        font-size: 14px;
        margin-left: 10px;
    }

    // 图片样式
    .r-content {
        .user {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }

    // TODO 这块的样式有问题
    .l-content {
        // 变成一行
        display: flex;
        // 垂直居中
        align-items: center;

        // /deep/ 样式穿刺
        /deep/.el-breadcrumb__item {
            .el-breadcrumb__inner {
                font-weight: normal;

                // &. 表示 el-breadcrumb_inner & islink
                &.is-link {
                    color: #999;
                }
            }

            // 最后的tag颜色不是白色的
            // css中的伪类
            &:last-child {
                .el-breadcrumb__inner {
                    color: #fff;
                }
            }
        }
    }
}
</style>