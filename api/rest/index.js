const Router    = require('koa-router');
const link      = require('../../utilities/link');
const people    = require('./people');
const planets   = require('./planets');
const species   = require('./species');
const starships = require('./starships');
const vehicles  = require('./vehicles');

const router = new Router();

people(router);
planets(router);
species(router);
starships(router);
vehicles(router);

router.get('/', ctx => {
  ctx.body = {
    people    : link(router, ctx, 'people'),
    planets   : link(router, ctx, 'planets'),
    species   : link(router, ctx, 'speciess'),
    starships : link(router, ctx, 'starships'),
    vehicles  : link(router, ctx, 'vehicles'),
  }
});

module.exports = router;
