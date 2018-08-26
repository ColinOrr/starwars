const PersonRepository = require('../../domain/personRepository');
const domain           = require('../../domain');
const link             = require('../../utilities/link');

function planets(router) {

  router.get('/planets', ctx => {
    ctx.body = domain
      .planets
      .query(ctx.query)
      .summarize(x => ({
        details_url : link(router, ctx, 'planet', x.id),
        people_url  : link(router, ctx, 'planet-people', x.id),
      }));
  });

  router.get('planet', '/planets/:id', ctx => {
    ctx.body = domain.planets.find(ctx.params.id);
    if (!ctx.body) ctx.status = 404;
  });

  router.get('planet-people', '/planets/:id/people', ctx => {
    const planet = domain.planets.find(ctx.params.id);
    if (!planet) ctx.status = 404;
    else {
      ctx.body =
        new PersonRepository(planet.people)
        .summarize(x => ({ url: link(router, ctx, 'person', x.id) }));
    }
  });

}

module.exports = planets;
