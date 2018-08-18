const Router  = require('koa-router');
const people  = require('./people');
const species = require('./species');

const router = new Router();

people(router);
species(router);

module.exports = router;
