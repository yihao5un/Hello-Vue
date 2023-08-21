const homesearchData = require('../../data/homesearch')
module.exports = (req,res,next)=>{
   const {label} = req.query
   const allData = homesearchData()
   const list = allData.list.filter(v=>v.label.includes(label))
   setTimeout(()=>{
      return res.success({
         list
      })
   },1000)
   
}