const Planet     = require('./planet');
const Repository = require('./framework/repository');
const retrieve   = require('../utilities/retrieve');
const wildcard   = require('../utilities/wildcard');

const url = 'https://cdn.rawgit.com/phalt/swapi/d9579f2f/resources/fixtures/planets.json';

class PlanetRepository extends Repository {
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
    return new PlanetRepository(planets);
  }
}

module.exports = PlanetRepository;
