const PersonRepository   = require('./personRepository');
const PlanetRepository   = require('./planetRepository');
const SpeciesRepository  = require('./speciesRepository');
const StarshipRepository = require('./starshipRepository');

class Domain {
  constructor() {
    this.people    = new PersonRepository();
    this.planets   = new PlanetRepository();
    this.species   = new SpeciesRepository();
    this.starships = new StarshipRepository();
  }

  async load() {
    const data = await Promise.all([
      PersonRepository.load(),
      PlanetRepository.load(),
      SpeciesRepository.load(),
      StarshipRepository.load(),
    ]);

    this.people    = data[0];
    this.planets   = data[1];
    this.species   = data[2];
    this.starships = data[3];

    this.people.link(this);
    this.species.link(this);
    this.starships.link(this);
  }
}

module.exports = new Domain();
