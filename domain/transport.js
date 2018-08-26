const map = require('../utilities/map');

class Transport {
  constructor(values) {

    this.id                     = null;
    this.name                   = null;
    this.model                  = null;
    this.manufacturer           = null;
    this.consumables            = null;
    this.cargo_capacity         = null;
    this.passengers             = null;
    this.max_atmosphering_speed = null;
    this.crew                   = null;
    this.length                 = null;
    this.cost_in_credits        = null;

    map(values, this);
  }

  summarize(extras) {
    const summary = {
      name         : this.name,
      model        : this.model,
      manufacturer : this.manufacturer,
    };

    return Object.assign(summary, extras);
  }
}

module.exports = Transport;
