const domain = require('../domain');
const Router = require('koa-router');
const router = new Router();

router.get('/people', ctx => {
  ctx.body = domain
    .people
    .query(ctx.query)
    .summarize(x => ({ url: `http://${ctx.request.host}/people/${x.id}`}))
    ;
});

router.get('/people/:id', ctx => {
  ctx.body = domain.people.find(ctx.params.id);
  if (!ctx.body) ctx.status = 404;
});

module.exports = router;
