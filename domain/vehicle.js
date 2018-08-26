const Transport = require('./transport');
const map       = require('../utilities/map');

const _pilots = Symbol('pilots');

class Vehicle extends Transport {
  constructor(values) {
    super(values);

    this.vehicle_class = null;

    map(values, this);

    this[_pilots] = values.pilots;
  }

  get pilots() {
    return this[_pilots];
  }

  link({ people }) {
    this[_pilots] = this.pilots.map(id => {
      const pilot = people.find(id);
      if (pilot) pilot.vehicles.push(this);
      return pilot || id;
    });
  }
}

module.exports = Vehicle;
