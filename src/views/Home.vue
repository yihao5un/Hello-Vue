<template>
    <el-row>
        <el-col :span="8" style="padding-right: 10px">
            <el-card class="box-card">
                <div class="user">
                    <img src="../assets/images/user.png" alt="">
                    <div class="userinfo">
                        <p class="name">Administrator</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间: <span>2012-12-12</span></p>
                    <p>上次登录地点: <span>武汉</span></p>
                </div>
            </el-card>
            <el-card style="margin-top: 20px;">
                <el-table :data="tableData" style="width: 100%">
                    <!-- <el-table-column prop="name" label="课程">
                    </el-table-column>
                    <el-table-column prop="todayBuy" label="今日购买">
                    </el-table-column>
                    <el-table-column prop="monthBuy" label="本月购买">
                    </el-table-column>
                    <el-table-column prop="totalBuy" label="总购买">
                    </el-table-column> -->

                    <!-- 可以定义一个标签tableLabel去遍历 -->
                    <!-- :prop :label 是动态属性 -->
                    <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val" />
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="padding-left: 10px">
            <div class="num">
                <!-- :body-style="{ display: 'flex' } 设置flex 左右布局 -->
                <el-card v-for="item in  countData " :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
                    <!-- 动态calss 模版字符串`` -->
                    <!-- 动态实现style的样式 :style -->
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
                    <div class="detail">
                        <p class="price">${{ item.value }}</p>
                        <p class="desc">{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
            <el-card style="height;: 280px">
                <!-- 折线图 -->
                <div ref="echarts1" style="height: 280px;"></div>
            </el-card>
            <!-- 左右布局的用 flex -->
            <div class="graph">
                <el-card style="height: 260px"></el-card>
                <el-card style=" height: 260px"></el-card>
            </div>
        </el-col>
    </el-row>
</template>
<script>
// ES6 getData 解构出来
import { getData } from '../api'
// 使用  import * as echarts from 'echarts'  可以确保您能够访问到 echarts 库中的所有功能和方法，而  import echarts from 'echarts'  则取决于 echarts 库的具体导出方式。
import * as echarts from 'echarts'

export default {
    data() {
        return {
            tableData: [],
            tableLabel: {
                name: "课程",
                todayBuy: "今日购买",
                monthBuy: "本月购买",
                totalBuy: "总购买"
            },
            countData: [
                {
                    name: "今日支付订单",
                    value: 1,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "今日收藏订单",
                    value: 5,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "今日未支付订单",
                    value: 2,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
                {
                    name: "本月支付订单",
                    value: 3,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "本月收藏订单",
                    value: 6,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "本月未支付订单",
                    value: 4,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
            ]
        }
    },
    mounted() {
        // { data } 解构拿到 data
        getData().then(({ data }) => {
            const { tableData } = data.data
            this.tableData = tableData
            // 基于准备好的DOM 初始化echarts的实例
            const echarts1 = echarts.init(this.$refs.echarts1)
            // 指定图表的配置项和数据
            var echarts1Option = {

            }
            // 处理数据XAxis
            const { orderData } = data.data
            const xAxis = Object.keys(orderData.data[0])
            const xAxisData = {
                data: xAxis
            }
            echarts1Option.xAxis = xAxisData
            echarts1Option.yAxis = {}
            echarts1Option.legend = xAxisData
            echarts1Option.series = []
            xAxis.forEach(key => {
                echarts1Option.series.push({
                    name: key,
                    data: orderData.data.map(item => item[key]),
                    type: 'line'
                })
            })
            echarts1.setOption(echarts1Option)
        })
    }
}
</script>

<style lang="less" scoped>
.user {
    padding-bottom: 20px;
    margin-bottom: 20px;
    // 向下的边框
    border-bottom: 1px solid #ccc;
    // flex 布局
    display: flex;
    align-items: center;

    img {
        width: 150px;
        height: 150;
        border-radius: 50%;
        margin-right: 40px;
    }

    .userinfo {

        .name {
            font-size: 28px;
            font-style: italic;
            margin-bottom: 10px;
        }

        .access {
            color: #999999;
        }
    }
}

.login-info {
    p {
        line-height: 28px;
        font-size: 14px;
        color: #999999;

        span {
            color: #666666;
            margin-left: 60px;
        }
    }
}

.num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .icon {
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: white;

    }

    .detail {
        margin-left: 15px;
        display: flex;
        // 改变主轴的实现方式 为上下
        flex-direction: column;
        // 垂直居中
        justify-content: center;

        .price {
            font-size: 20px;
            font-style: italic;
            margin-bottom: 10px;
            line-height: 30px;
            height: 30px;
        }

        .desc {
            font-size: 14px;
            color: #999999;
            text-align: center;
        }
    }

    .el-card {
        width: 32%;
        margin-bottom: 20px;
    }
}

.graph {
    margin-top: 20px;
    // flex 布局
    display: flex;
    // 左右贴边
    justify-content: space-between;

    // 层级的方式加样式
    .el-card {
        width: 48%;
    }
}
</style>