const test = require('../data/test')
const homePage = require('../data/homedata')
function responseData(data) {
    return {
        code: 200,
        msg: '请求成功',
        data,
    }
}
module.exports = ()=>{
    return {
        testjson:test(),
        home_page: responseData(homePage()),
    }
}