const PersonRepository = require('./personRepository');
const map              = require('../utilities/map');

const _people = Symbol('people');

class Planet {
  constructor(values) {

    this.id              = null;
    this.name            = null;
    this.terrain         = null;
    this.climate         = null;
    this.surface_water   = null;
    this.diameter        = null;
    this.rotation_period = null;
    this.created         = null;
    this.gravity         = null;
    this.orbital_period  = null;
    this.population      = null;

    map(values, this);

    this[_people] = new PersonRepository();
  }

  get people() {
    return this[_people];
  }

  summarize(extras) {
    const summary = {
      name    : this.name,
      terrain : this.terrain,
      climate : this.climate,
    };

    return Object.assign(summary, extras);
  }
}

module.exports = Planet;
