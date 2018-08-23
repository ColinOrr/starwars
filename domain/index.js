const PersonArray  = require('./personArray');
const SpeciesArray = require('./speciesArray');
const PlanetArray  = require('./planetArray');

class Domain {
  constructor() {
    this.people  = new PersonArray();
    this.species = new SpeciesArray();
    this.planets = new PlanetArray();
  }

  async load() {
    [this.people, this.species, this.planets] = await Promise.all([
      PersonArray.load(),
      SpeciesArray.load(),
      PlanetArray.load(),
    ]);

    this.people.forEach(x => x.link(this));
    this.species.forEach(x => x.link(this));
  }
}

module.exports = new Domain();
