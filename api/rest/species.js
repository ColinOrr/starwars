const PersonRepository = require('../../domain/personRepository');
const domain           = require('../../domain');
const link             = require('../../utilities/link');

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

  router.get('species-people', '/species/:id/people', ctx => {
    const species = domain.species.find(ctx.params.id);
    if (!species) ctx.status = 404;
    else {
      ctx.body = 
        new PersonRepository(species.people)
        .summarize(x => ({ url: link(router, ctx, 'person', x.id) }));
    }
  });

}

module.exports = species;
