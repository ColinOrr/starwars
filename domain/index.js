const PersonArray  = require('./personArray');
const SpeciesArray = require('./speciesArray');

class Domain {
  constructor() {
    this.people  = new PersonArray();
    this.species = new SpeciesArray();
  }

  async load() {
    [this.people, this.species] = await Promise.all([
      PersonArray.load(),
      SpeciesArray.load(),
    ]);
  }
}

module.exports = new Domain();
