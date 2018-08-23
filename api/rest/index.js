const Router  = require('koa-router');
const people  = require('./people');
const species = require('./species');
const planets = require('./planets');

const router = new Router();

people(router);
species(router);
planets(router);

module.exports = router;
