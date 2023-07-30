<template>
    <div class="tabs">
        <el-tag v-for="(item, index) in tags" :key="item.path" :closable="item.name !== 'home'"
            :effect="$route.name === item.name ? 'dark' : 'plain'" @click="changeMenu(item)"
            @close="handleClose(item, index)" size="small">
            {{ item.label }}
        </el-tag>
    </div>
</template>
<script>
// 辅助函数 解构
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'CommonTags',
    data() {
        return {}
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabList
        })
    },
    methods: {
        // 将strore中的mutation渲染到了页面中(tab) 并用ES6 
        ...mapMutations(['closeTag']),
        // 点击Tag跳转的功能
        changeMenu(item) {
            // 跳转的第二种方式
            /**
             * this.$router 是用于控制路由的实例
             * this.$route 用于获取当前路由信息的对象。
             */
            this.$router.push({ name: item.name });
        },
        // 点击Tag删除的功能
        // 传入当前的数据和索引
        handleClose(item, index) {
            // 调用 store 中的 mutations
            this.closeTag(item);
            // length是当前已经删除后的tags的长度 将 length 和 index 比较
            const length = this.tags.length
            // 删除之后的跳转逻辑
            if (item.name !== this.$route.name) {
                return
            }
            // 表示的是删除的最后一项
            if (index === length) {
                this.$router.push({
                    // 跳转到前面
                    name: this.tags[index - 1].name
                })
            } else {
                this.$router.push({
                    // 跳转到后面
                    name: this.tags[index - 1].name
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.tabs {
    padding: 20px;

    .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>