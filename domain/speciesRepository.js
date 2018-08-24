const Species    = require('./species');
const Repository = require('./framework/repository');
const retrieve   = require('../utilities/retrieve');
const wildcard   = require('../utilities/wildcard');

const url = 'https://cdn.rawgit.com/phalt/swapi/d9579f2f/resources/fixtures/species.json';

class SpeciesRepository extends Repository {
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
    return new SpeciesRepository(species);
  }
}

module.exports = SpeciesRepository;
