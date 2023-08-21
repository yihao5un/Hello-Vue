const userData = require('../../data/userData')
module.exports = (req,res,next)=>{
//    const {label} = req.query
//    const allData = homesearchData()
//    const list = allData.list.filter(v=>v.label.includes(label))
//    setTimeout(()=>{
//       return res.success({
//          list
//       })
//    },1000)
const list = userData().getUserList()
   return res.success({
        list
    })
   
}