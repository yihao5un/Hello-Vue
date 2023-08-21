const test = require('../../data/test')
module.exports = (req,res,next)=>{
    const testData = test()
    testData.desc = '这是测试1数据的描述'
    res.success(testData)
}