const map = require('../utilities/map');

const _species = Symbol('species');

class Person {
  constructor(values) {

    this.id         = null;
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

    this[_species] = null;
  }

  get species() {
    return this[_species];
  }

  set species(value) {
    this[_species] = value;
  }

  summarize(extras) {
    const summary = {
      name       : this.name,
      gender     : this.gender,
      birth_year : this.birth_year,
    };

    return Object.assign(summary, extras);
  }
}

module.exports = Person;
