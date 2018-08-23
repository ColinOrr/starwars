const domain = require('../../domain');
const link   = require('../../utilities/link');

function people(router) {

  router.get('/people', ctx => {
    ctx.body = domain
      .people
      .query(ctx.query)
      .summarize(x => ({ url: link(router, ctx, 'person', x.id) }));
  });

  router.get('person', '/people/:id', ctx => {
    ctx.body = domain.people.find(ctx.params.id);
    if (!ctx.body) ctx.status = 404;
  });

  router.get('person-species', '/people/:id/species', ctx => {
    const person = domain.people.find(ctx.params.id) || {};
    ctx.body = person.species;
    if (!ctx.body) ctx.status = 404;
  });

  router.get('person-homeworld', '/people/:id/homeworld', ctx => {
    const person = domain.people.find(ctx.params.id) || {};
    ctx.body = person.homeworld;
    if (!ctx.body) ctx.status = 404;
  });
};

module.exports = people;
