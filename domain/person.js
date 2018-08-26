const map = require('../utilities/map');

const _species   = Symbol('species');
const _homeworld = Symbol('homeworld');
const _starships = Symbol('starships');

class Person {
  constructor(values) {

    this.id         = null;
    this.name       = null;
    this.gender     = null;
    this.skin_color = null;
    this.hair_color = null;
    this.height     = null;
    this.eye_color  = null;
    this.mass       = null;
    this.homeworld  = null;
    this.birth_year = null;

    map(values, this);

    this[_species]   = null;
    this[_homeworld] = values.homeworld;
    this[_starships] = [];
  }

  get species() {
    return this[_species];
  }

  set species(value) {
    this[_species] = value;
  }

  get homeworld() {
    return this[_homeworld];
  }

  set homeworld(value) {
    this[_homeworld] = value;
  }

  get starships() {
    return this[_starships];
  }

  summarize(extras) {
    const summary = {
      name       : this.name,
      gender     : this.gender,
      birth_year : this.birth_year,
    };

    return Object.assign(summary, extras);
  }

  link({ planets }) {
    this.homeworld = planets.find(this.homeworld);
    if (this.homeworld) this.homeworld.people.push(this);
  }
}

module.exports = Person;
