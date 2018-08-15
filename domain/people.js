const Person   = require('./person');
const retrieve = require('../utilities/retrieve');
const wildcard = require('../utilities/wildcard');

const url = 'https://cdn.rawgit.com/phalt/swapi/d9579f2f/resources/fixtures/people.json';

class People extends Array {
  constructor(people) {
    super();
    if (people && people.forEach) {
      people.forEach(p => this.push(p));
    }
  }

  find(id) {
    return this.filter(x => x.id == id)[0];
  }

  query(filters) {
    return this
      .withName(filters.name);
  }

  withName(name) {
    if (!name) return this;
    return this.filter(x => wildcard(x.name, name));
  }

  summarize(extras = () => {}) {
    return this.map(x => x.summarize(extras(x)));
  }

  static async load() {
    const people = await retrieve(Person, url);
    console.log(`${people.length} people loaded`);
    return new People(people);
  }
}

module.exports = People;
