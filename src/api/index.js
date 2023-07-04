import http from '../utils/request';

// 请求首页数据
export const getData = () => {
    // 返回一个promise的对象(通过.then可以拿到结果)
    return http.get('/home/getData')
}