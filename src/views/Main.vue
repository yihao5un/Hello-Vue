<template>
    <div>
        <el-container>
            <!-- auto 自适应 -->
            <el-aside width="auto">
                <!-- 用小驼峰命名下面引用的组件 -->
                <common-aside />
            </el-aside>
            <el-container>
                <el-header>
                    <!-- 用小驼峰命名下面引用的组件 -->
                    <common-header />
                </el-header>
                <!-- Tag 标签 -->
                <common-tag />
                <el-main>
                    <!-- 子路由出口 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
// 导入组件
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
import CommonTag from '../components/CommonTag.vue'

export default {
    data() {
        return {

        }
    },
    // 引入组件
    components: {
        CommonAside,
        CommonHeader,
        CommonTag
    }
}
</script>
<style scoped>
.el-header {
    padding: 0;
}
</style>