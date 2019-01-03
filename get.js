const koa = require('koa')
const fs = require('fs')
const Router = require('koa-router')
const app = new koa()

const home = new Router()
home.get('/', async (ctx)=> {
    let url = ctx.url
    let request = ctx.request
    let reqQueryData = request.query
    let reqQueryString = request.querystring
    

    let queryDate = ctx.query
    let querystring = ctx.querystring
    ctx.body= {
        url,
        reqQueryData,
        reqQueryString,
        queryDate,
        querystring
    }
})
const page = new Router()
page.get('/2', async (ctx)=> {
    let html = await readFileFn('2')
    ctx.body = html
})

// 装在子路由
let router= new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

// 使用router中间件
app.use(router.routes()).use(router.allowedMethods())
app.listen(3001, ()=> {
    console.log('成功')
})

function readFileFn(page) {
   return new Promise((resolve, reject)=> {
       let url = `./view/${page}.html`
       fs.readFile(url, "utf-8", (err, data)=> {
           if (err) {
                reject(err)
           } else {
               resolve(data)
           }
       })
   })
}
