const Koa     = require('koa');
const json    = require('koa-json');
const domain  = require('./domain');
const rest    = require('./api/rest');
const graphql = require('./api/graphql');

const app = new Koa();

app.use(async (ctx, next) => {
  await domain.load();
  await next();
});

app
  .use(json())
  .use(rest.routes())
  .use(rest.allowedMethods());

graphql
  .applyMiddleware({ app });

module.exports = app;
