const Species  = require('./species');
const retrieve = require('../utilities/retrieve');
const wildcard = require('../utilities/wildcard');

const url = 'https://cdn.rawgit.com/phalt/swapi/d9579f2f/resources/fixtures/species.json';

class SpeciesArray extends Array {
  constructor(species) {
    super();
    if (species && species.forEach) {
      species.forEach(x => this.push(x));
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
    const species = await retrieve(Species, url);
    console.log(`${species.length} species loaded`);
    return new SpeciesArray(species);
  }
}

module.exports = SpeciesArray;
