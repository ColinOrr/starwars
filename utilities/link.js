function link(router, ctx, ...args) {
  return `http://${ctx.request.host}` + router.url(...args);
}

module.exports = link;
