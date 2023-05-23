<template>
    <div>
        <el-container>
            <el-aside width="200px">
                <!-- 用小驼峰命名下面引用的组件 -->
                <common-aside />
            </el-aside>
            <el-container>
                <el-header>Header</el-header>
                <el-main>
                    <h1>我是Main</h1>
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
export default {
    data() {
        return {
            
        }
    },
    // 引入组件
    components: {
        CommonAside
    }
}
</script>