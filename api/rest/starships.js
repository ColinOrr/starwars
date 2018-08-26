const PersonRepository = require('../../domain/personRepository');
const domain           = require('../../domain');
const link             = require('../../utilities/link');

function starships(router) {

  router.get('/starships', ctx => {
    ctx.body = domain
      .starships
      .query(ctx.query)
      .summarize(x => ({
        details_url : link(router, ctx, 'starship', x.id),
        pilots_url  : link(router, ctx, 'starship-pilots', x.id),
      }));
  });

  router.get('starship', '/starships/:id', ctx => {
    ctx.body = domain.starships.find(ctx.params.id);
    if (!ctx.body) ctx.status = 404;
  });

  router.get('starship-pilots', '/starships/:id/pilots', ctx => {
    const starship = domain.starships.find(ctx.params.id);
    if (!starship) ctx.status = 404;
    else {
      ctx.body =
        new PersonRepository(starship.pilots)
        .summarize(x => ({ url: link(router, ctx, 'person', x.id) }));
    }
  });

}

module.exports = starships;
