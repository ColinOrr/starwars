const fetch    = require('node-fetch');
const map      = require('../utilities/map');
const wildcard = require('../utilities/wildcard');

const url = 'https://cdn.rawgit.com/phalt/swapi/d9579f2f/resources/fixtures/people.json';

class Person {
  constructor(values) {

    this.name       = null;
    this.created    = null;
    this.gender     = null;
    this.skin_color = null;
    this.hair_color = null;
    this.height     = null;
    this.eye_color  = null;
    this.mass       = null;
    this.homeworld  = null;
    this.birth_year = null;

    map(values, this);
  }
}

class PersonSummary {
  constructor(values) {

    this.name       = null;
    this.gender     = null;
    this.birth_year = null;

    map(values, this);
  }
}

class People extends Array {
  constructor(people) {
    super();
    if (people && people.forEach) {
      people.forEach(p => this.push(p));
    }
  }

  withName(name) {
    if (!name) return this;
    return this.filter(x => wildcard(x.name, name));
  }

  toSummary() {
    return this.map(x => new PersonSummary(x));
  }

  static async load() {
    const response = await fetch(url);
    const data     = await response.json();
    const people   = data.map(d => new Person(d.fields));

    console.log(`${people.length} people loaded`);
    return new People(people);
  }
}

module.exports = People;
