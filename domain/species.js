const map = require('../utilities/map');

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
  }

  summarize(extras) {
    const summary = {
      name           : this.name,
      classification : this.classification,
      designation    : this.designation,
    };

    return Object.assign(summary, extras);
  }
}

module.exports = Species;
