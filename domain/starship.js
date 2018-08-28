const Transport = require('./transport');
const map       = require('../utilities/map');

const _pilots = Symbol('pilots');

class Starship extends Transport {
  constructor(values) {
    const PersonRepository = require('./personRepository');

    super(values);

    this.MGLT              = null;
    this.starship_class    = null;
    this.hyperdrive_rating = null;

    map(values, this);

    this[_pilots] = new PersonRepository(values.pilots);
  }

  get pilots() {
    return this[_pilots];
  }

  link({ people }) {
    this[_pilots] = this.pilots.map(id => {
      const pilot = people.find(id);
      if (pilot) pilot.starships.push(this);
      return pilot || id;
    });
  }
}

module.exports = Starship;
