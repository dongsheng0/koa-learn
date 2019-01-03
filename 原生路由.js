const koa = require('koa')
const app = new koa()
const bodyparser = require('koa-bodyparser')
const fs = require('fs')
app.use(bodyparser())
// 原生实现路由的方法
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
  
  
  /**
   * 根据URL获取HTML内容
   * @param  {string} url koa2上下文的url，ctx.url
   * @return {string}     获取HTML文件内容
   */
  async function route( url ) {
    let view = '404.html'
    switch ( url ) {
      case '/':
        view = 'index.html'
        break
      case '/index':
        view = 'index.html'
        break
      case '/2':
        view = '2.html'
        break
      case '/404':
        view = '404.html'
        break
      default:
        break
    }
    let html = await render( view )
    return html
  }
  
  app.use( async ( ctx ) => {
    let url = ctx.request.url
    console.log("wds" + url)
    let html = await route( url )
    ctx.body = html
  })
  
app.listen(3001, () => {
    console.log('success')
})