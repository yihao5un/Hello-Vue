import Mock from 'mockjs'
import homeApi from './mockServerData/home'
import user from './mockServerData/user'
import permisssion from './mockServerData/permisssion'

// 定义mock请求拦截
Mock.mock('api/home/getData', homeApi.getStatisticalData)

// 用户列表的数据 
Mock.mock('api/user/add', 'post', user.createUser);
Mock.mock('api/user/edit', 'post',user.updateUser);
Mock.mock('api/user/del', 'post',user.deleteUser);
// Mock.mock(/api\/user\/getUser/, user.getUserList); // 正则 

// 权限拦截器
Mock.mock(/api\/permission\/getMenu/, 'post',permisssion.getMenu)