const koa = require('koa')
const path = require('path')
const staic = require('koa-static')
const app = new koa()
const staicpath= './static'

// app.use(staic(
//   path.join(__dirname, staicpath)
// ))
app.use(async ctx => {
   ctx.cookies.set('cid', 'wds')
   ctx.cookies.set('c-test', 'nihao')
  let cookiesStr = ctx.cookies.get('c-test')
  console.log(cookiesStr)
  ctx.body= "111" + cookiesStr
})
app.listen(3001, () => {
  console.log('成功')
})

