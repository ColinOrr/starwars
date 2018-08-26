const Router    = require('koa-router');
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

module.exports = router;
