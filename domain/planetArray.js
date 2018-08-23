const Planet   = require('./planet');
const retrieve = require('../utilities/retrieve');
const wildcard = require('../utilities/wildcard');

const url = 'https://cdn.rawgit.com/phalt/swapi/d9579f2f/resources/fixtures/planets.json';

class PlanetArray extends Array {
  constructor(planets) {
    super();
    if (planets && planets.forEach) {
      planets.forEach(x => this.push(x));
    }
  }

  find(id) {
    return this.filter(x => x.id == id)[0];
  }

  summarize(extras = () => {}) {
    return this.map(x => x.summarize(extras(x)));
  }

  query(filters) {
    return this
      .withName(filters.name);
  }

  withName(name) {
    if (!name) return this;
    return this.filter(x => wildcard(x.name, name));
  }

  static async load() {
    const planets = await retrieve(Planet, url);
    console.log(`${planets.length} planets loaded`);
    return new PlanetArray(planets);
  }
}

module.exports = PlanetArray;
