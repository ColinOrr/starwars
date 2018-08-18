const domain = require('../../domain');
const link   = require('../../utilities/link');

function species(router) {

  router.get('/species', ctx => {
    ctx.body = domain
      .species
      .query(ctx.query)
      .summarize(x => ({ url: link(router, ctx, 'species', x.id) }));
  });

  router.get('species', '/species/:id', ctx => {
    ctx.body = domain.species.find(ctx.params.id);
    if (!ctx.body) ctx.status = 404;
  });

}

module.exports = species;
