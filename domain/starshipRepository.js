const Starship   = require('./starship');
const Transport  = require('./transport');
const Repository = require('./framework/repository');
const map        = require('../utilities/map');
const retrieve   = require('../utilities/retrieve');
const wildcard   = require('../utilities/wildcard');

const transportsUrl = 'https://cdn.rawgit.com/phalt/swapi/d9579f2f/resources/fixtures/transport.json';
const starshipsUrl  = 'https://cdn.rawgit.com/phalt/swapi/d9579f2f/resources/fixtures/starships.json';

class StarshipRepository extends Repository {
  query(filters) {
    return this
      .withName(filters.name);
  }

  withName(name) {
    if (!name) return this;
    return this.filter(x => wildcard(x.name, name));
  }

  static async load() {
    const [transports, starships] = await Promise.all([
      retrieve(Transport, transportsUrl),
      retrieve(Starship, starshipsUrl),
    ]);

    starships.forEach(s => {
      const transport = transports.filter(t => t.id == s.id)[0];
      map(transport, s);
    });

    console.log(`${starships.length} starships loaded`);
    return new StarshipRepository(starships);
  }
}

module.exports = StarshipRepository;
