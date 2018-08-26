const PersonRepository   = require('./personRepository');
const PlanetRepository   = require('./planetRepository');
const SpeciesRepository  = require('./speciesRepository');
const StarshipRepository = require('./starshipRepository');
const VehicleRepository  = require('./vehicleRepository');

class Domain {
  constructor() {
    this.people    = new PersonRepository();
    this.planets   = new PlanetRepository();
    this.species   = new SpeciesRepository();
    this.starships = new StarshipRepository();
    this.vehicles  = new VehicleRepository();
  }

  async load() {
    const data = await Promise.all([
      PersonRepository.load(),
      PlanetRepository.load(),
      SpeciesRepository.load(),
      StarshipRepository.load(),
      VehicleRepository.load(),
    ]);

    this.people    = data[0];
    this.planets   = data[1];
    this.species   = data[2];
    this.starships = data[3];
    this.vehicles  = data[4];

    this.people.link(this);
    this.species.link(this);
    this.starships.link(this);
    this.vehicles.link(this);
  }
}

module.exports = new Domain();
