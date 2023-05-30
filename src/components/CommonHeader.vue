<template>
    <div class="header-container">
        <div class="l-content">
            <el-button icon="el-icon-menu" size="mini"></el-button>
            <!-- 面包屑 -->
            <span class="text">首页</span>
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img class="user" src="../assets/images/user.png" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
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
}
</style>