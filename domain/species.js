const PersonRepository = require('./personRepository');
const map              = require('../utilities/map');

const _people = Symbol('people');

class Species {
  constructor(values) {

    this.id               = null;
    this.name             = null;
    this.classification   = null;
    this.designation      = null;
    this.created          = null;
    this.eye_colors       = null;
    this.skin_colors      = null;
    this.language         = null;
    this.hair_colors      = null;
    this.homeworld        = null;
    this.average_lifespan = null;
    this.average_height   = null;

    map(values, this);

    this[_people] = new PersonRepository(values.people);
  }

  get people() {
    return this[_people];
  }

  summarize(extras) {
    const summary = {
      name           : this.name,
      classification : this.classification,
      designation    : this.designation,
    };

    return Object.assign(summary, extras);
  }

  link({ people }) {
    this[_people] = this[_people].map(id => {
      const person = people.find(id);
      if (person) person.species = this;
      return person || id;
    });
  }
}

module.exports = Species;
