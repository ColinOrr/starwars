const Koa    = require('koa');
const json   = require('koa-json');
const domain = require('./domain');
const rest   = require('./api/rest');

const app = new Koa();

app
  .use(json())
  .use(rest.routes())
  .use(rest.allowedMethods());

domain
  .load()
  .then(() => {
    app.listen(3000, () => console.log('🚀 Server ready on port 3000'));
  });
