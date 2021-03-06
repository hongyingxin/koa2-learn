const router = require('koa-router')()
const Person = require('../dbs/models/person')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/addPerson', async function (ctx) {
  const person = new Person({
    name: ctx.require.body.name,
    age: ctx.require.body.age
  })
  let code
  try {
    await person.save();
    code = 0
  } catch (e) {
    code = 1
  }

  ctx.body = {
    code: code
  }
})

module.exports = router
