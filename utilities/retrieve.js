const fetch = require('node-fetch');

async function retrieve(type, url) {
  const response = await fetch(url);
  const data     = await response.json();

  return data.map(d => {
    d.fields.id = d.pk;
    return new type(d.fields)
  });
}

module.exports = retrieve;
