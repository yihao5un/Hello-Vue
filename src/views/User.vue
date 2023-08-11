<template>
    <div class="manage">
        <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
            <!-- 用户的表单信息 -->
            <!-- :inline 一行 -->
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
                <el-form-item label="姓名" prop="name">
                    <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请输入">
                        <!-- :value 改成 v-bind方式 -->
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker v-model="form.birth" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <div class="manage-header">
            <el-button @click="handleAdd" type="primary" size="small">
                + 新增
            </el-button>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="sexLabel" label="性别">
                    <template slot-scope="scope">
                        <i class="el-icon-user"></i>
                        <span style="margin-left: 10px">
                            {{ scope.row.sex === 1 ? '男' : '女' }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="age" label="年龄">
                </el-table-column>
                <el-table-column prop="birth" label="出生日期">
                </el-table-column>
                <el-table-column prop="addr" label="地址">
                </el-table-column>
                <el-table-column prop="addr" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { getUser, addUser, editUser, delUser } from '../api'

export default {
    data() {
        return {
            dialogVisible: false,
            form: {
                name: '',
                age: '',
                sex: '',
                birth: '',
                addr: ''
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入姓名'
                    }
                ],
                age: [
                    {
                        required: true,
                        message: '请输入年龄'
                    }
                ],
                sex: [
                    {
                        required: true,
                        message: '请选择性别'
                    }
                ],
                birth: [
                    {
                        required: true,
                        message: '请选择出生日期'
                    }
                ],
                addr: [
                    {
                        required: true,
                        message: '请输入地址'
                    }
                ]
            },
            tableData: [

            ],
            modalType: 0 // 0 表示新增的弹窗 1 表示编辑
        }
    },
    methods: {
        // 提交用户表单
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.modalType === 0) {
                        // 新增
                        addUser(this.form).then(() => {
                            // 重新获取列表接口
                            this.getList()
                        })
                    } else {
                        // 修改
                        editUser(this.form).then(() => {
                            // 重新获取列表接口
                            this.getList()
                        })
                    }
                    // 后续对表单数据的获取
                    console.log(this.form, 'form')
                    // 清空表单的数据
                    this.$refs.form.resetFields()
                    // 关闭弹窗
                    this.dialogVisible = false

                }
            })
        },
        // 弹窗关闭的时候
        handleClose() {
            this.$refs.form.resetFields()
            // 关闭 dialog
            this.dialogVisible = false
        },
        // 点击按钮的时候
        cancel() {
            // 调用方法
            this.handleClose()
        },
        handleEdit(row) {
            this.modalType = 1
            this.dialogVisible = true
            // 特别注意 不能直接用row 要对当前行数据进行深拷贝
            // https://blog.csdn.net/weixin_55726815/article/details/131891540
            this.form = JSON.parse(JSON.stringify(row))
        },
        handleDelete(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 调用删除的接口
                delUser({ id: row.id }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    // 注意箭头函数作用域的使用
                    this.getList()
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handleAdd(row) {
            this.modalType = 0
            this.dialogVisible = true
        },
        // 获取列表的数据
        getList() {
            getUser().then(({ data }) => {
                this.tableData = data.list
            })
        }
    },
    // 页面首次加载的时候
    mounted() {
        this.getList()
    }
}
</script>