const escapeRegex = require('./escapeRegex');

function wildcard(value, pattern) {
  let regex = escapeRegex(pattern);
  regex = regex.replace(/\\\*/g, '.*');
  regex = '^' + regex + '$';

  return value.match(new RegExp(regex, 'i')) != null;
}

module.exports = wildcard;
