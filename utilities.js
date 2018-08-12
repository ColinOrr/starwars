const _ = module.exports;

module.exports.map = (source, target) => {
  for (p in source) {
    if (p in target) target[p] = source[p];
  }
  return target;
}

module.exports.escapeRegex = (value) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports.wildcard = (value, pattern) => {
  let regex = _.escapeRegex(pattern);
  regex = regex.replace(/\\\*/g, '.*');
  regex = '^' + regex + '$';

  return value.match(new RegExp(regex, 'i')) != null;
}
