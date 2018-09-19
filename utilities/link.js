function link(router, ctx, ...args) {
  let appRoot = process.env.APP_ROOT || '';
  if (appRoot.length && !appRoot.startsWith('/')) appRoot = '/' + appRoot;
  return `${ctx.protocol}://${ctx.request.host}${appRoot}` + router.url(...args);
}

module.exports = link;
