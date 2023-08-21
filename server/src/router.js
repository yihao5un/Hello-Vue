const test = require('./controller/test')
const test1 = require('./controller/test1')
const homeSearch = require('./controller/homeSearch')
const userData = require('./controller/user')
module.exports = (app)=>{
    app.use('/api/test',test)
    app.use('/api/home',test1)
    app.use('/api/homeSearch',homeSearch),
    app.use('/api/users/getUser',userData)
}