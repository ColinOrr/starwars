const PersonRepository  = require('./personRepository');
const SpeciesRepository = require('./speciesRepository');
const PlanetRepository  = require('./planetRepository');

class Domain {
  constructor() {
    this.people  = new PersonRepository();
    this.species = new SpeciesRepository();
    this.planets = new PlanetRepository();
  }

  async load() {
    const data = await Promise.all([
      PersonRepository.load(),
      SpeciesRepository.load(),
      PlanetRepository.load(),
    ]);

    this.people  = data[0];
    this.species = data[1];
    this.planets = data[2];

    this.people.forEach(x => x.link(this));
    this.species.forEach(x => x.link(this));
  }
}

module.exports = new Domain();
