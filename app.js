const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const Redis = require('koa-redis')

const pv = require('./intermediate/koa-pv')
const ms1 = require('./intermediate/ms-one')
const ms2 = require('./intermediate/ms-two')
const ms3 = require('./intermediate/ms-three')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

app.keys = ['keys','keyskeys']
app.use(session({
  key:'mt',
  prefix:'mtpv',
  store:new Redis()
}))

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

app.use(pv());
app.use(ms1());
app.use(ms2());
app.use(ms3());

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
