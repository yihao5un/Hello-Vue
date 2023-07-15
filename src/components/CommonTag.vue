<template>
    <div class="tabs">
        <el-tag v-for="item in tags" :key="item.path" :closable="item.name !== 'home'"
            :effect="$route.name === item.name ? 'dark' : 'plain'">
            {{ item.label }}
        </el-tag>
    </div>
</template>
<script>
// 辅助函数 解构
import { mapState } from 'vuex';

export default {
    name: 'CommonTags',
    data() {
        return {}
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabList
        })
    }
}
</script>