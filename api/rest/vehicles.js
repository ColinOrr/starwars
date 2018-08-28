const domain = require('../../domain');
const link   = require('../../utilities/link');

function vehicles(router) {

  router.get('/vehicles', ctx => {
    ctx.body = domain
      .vehicles
      .query(ctx.query)
      .summarize(x => ({
        details_url : link(router, ctx, 'vehicle', x.id),
        pilots_url  : link(router, ctx, 'vehicle-pilots', x.id),
      }));
  });

  router.get('vehicle', '/vehicles/:id', ctx => {
    ctx.body = domain.vehicles.find(ctx.params.id);
    if (!ctx.body) ctx.status = 404;
  });

  router.get('vehicle-pilots', '/vehicles/:id/pilots', ctx => {
    const vehicle = domain.vehicles.find(ctx.params.id);
    if (!vehicle) ctx.status = 404;
    else {
      ctx.body = vehicle
        .pilots
        .summarize(x => ({ url: link(router, ctx, 'person', x.id) }));
    }
  });

}

module.exports = vehicles;
