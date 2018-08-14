function map(source, target) {
  for (p in source) {
    if (p in target) target[p] = source[p];
  }
  return target;
}

module.exports = map;
