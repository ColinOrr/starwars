const Person     = require('./person');
const Repository = require('./framework/repository');
const retrieve   = require('../utilities/retrieve');
const wildcard   = require('../utilities/wildcard');

const url = 'https://cdn.rawgit.com/phalt/swapi/d9579f2f/resources/fixtures/people.json';

class PersonRepository extends Repository {
  query(filters) {
    return this
      .withName(filters.name);
  }

  withName(name) {
    if (!name) return this;
    return this.filter(x => wildcard(x.name, name));
  }

  static async load() {
    const people = await retrieve(Person, url);
    console.log(`${people.length} people loaded`);
    return new PersonRepository(people);
  }
}

module.exports = PersonRepository;
