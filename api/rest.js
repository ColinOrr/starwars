const domain = require('../domain');
const Router = require('koa-router');
const router = new Router();

router.get('/people', ctx => {
  ctx.body = domain
    .people
    .withName(ctx.query.name)
    .map(p => ({
      name       : p.name,
      gender     : p.gender,
      birth_year : p.birth_year,
      url        : `http://${ctx.request.host}/people/${p.id}`,
    }));
});

router.get('/people/:id', ctx => {
  ctx.body = domain.people.find(ctx.params.id);
  if (!ctx.body) ctx.status = 404;
});

module.exports = router;
