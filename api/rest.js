const domain = require('../domain');
const Router = require('koa-router');
const router = new Router();

router.get('/people', (ctx, next) => {
  ctx.body = domain
    .people
    .withName(ctx.query.name)
    .toSummary();
});

module.exports = router;
