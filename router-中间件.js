const Koa = require('koa')
const fs = require('fs')
const app = new Koa()
const Router = require('koa-router')

// 子路由1
let home = new Router()
home.get('/', async (ctx) => {
    let html = await render('index.html')
    ctx.body = html
})
// 子路由2
let page = new Router()
page.get("/404", async (ctx) => {
    let html = await render('404.html')
    ctx.body = html
}).get('/2', async (ctx) => {
    let html = await render('2.html')
    ctx.body = html
})
// 装载所有子路由
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(3001, ()=> {
    console.log('成功')
})


  /**
 * 用Promise封装异步读取文件方法
 * @param  {string} page html文件名称
 * @return {promise}      
 */
function render( page ) {
    return new Promise(( resolve, reject ) => {
      let viewUrl = `./view/${page}`
      fs.readFile(viewUrl, "binary", ( err, data ) => {
        if ( err ) {
          reject( err )
        } else {
          resolve( data )
        }
      })
    })
  }
