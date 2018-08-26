const StarshipRepository = require('../../domain/starshipRepository');
const VehicleRepository  = require('../../domain/vehicleRepository');
const domain             = require('../../domain');
const link               = require('../../utilities/link');

function people(router) {

  router.get('/people', ctx => {
    ctx.body = domain
      .people
      .query(ctx.query)
      .summarize(x => ({
        details_url   : link(router, ctx, 'person', x.id),
        species_url   : link(router, ctx, 'person-species', x.id),
        homeworld_url : link(router, ctx, 'person-homeworld', x.id),
        starships_url : link(router, ctx, 'person-starships', x.id),
        vehicles_url  : link(router, ctx, 'person-vehicles', x.id),
      }));
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

  router.get('person-starships', '/people/:id/starships', ctx => {
    const person = domain.people.find(ctx.params.id);
    if (!person) ctx.status = 404;
    else {
      ctx.body =
        new StarshipRepository(person.starships)
        .summarize(x => ({ url: link(router, ctx, 'starship', x.id) }));
    }
  });

  router.get('person-vehicles', '/people/:id/vehicles', ctx => {
    const person = domain.people.find(ctx.params.id);
    if (!person) ctx.status = 404;
    else {
      ctx.body =
        new VehicleRepository(person.vehicles)
        .summarize(x => ({ url: link(router, ctx, 'vehicle', x.id) }));
    }
  });
};

module.exports = people;
