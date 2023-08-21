
const jsonServer = require('json-server')
const db = require('./db')()
const path = require('path')
const server = jsonServer.create()
const router =  require('./router')
const middlewares = jsonServer.defaults({
    static:path.join(__dirname,'../public')
})
server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use((req,res,next)=>{
    const json = res.json.bind(res)
    res.success = (data)=>{
        return json({
            code:200,
            msg:'请求成功',
            data
        })
    }
    res.fail = (msg,code=-1,data)=>{
        return json({
            code,
            msg,
            data
        })
    }
    next()
})
router(server)
const jsonRouter = jsonServer.router(db)
server.use((req, res, next) => {
    setTimeout(next, 1000)
})
server.use('/api',jsonRouter)
server.listen(9000,()=>{
   console.log('json-server is listen 9000')
})