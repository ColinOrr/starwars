const Vehicle    = require('./vehicle');
const Transport  = require('./transport');
const Repository = require('./framework/repository');
const map        = require('../utilities/map');
const retrieve   = require('../utilities/retrieve');
const wildcard   = require('../utilities/wildcard');

const transportsUrl = 'https://cdn.rawgit.com/phalt/swapi/d9579f2f/resources/fixtures/transport.json';
const vehiclesUrl   = 'https://cdn.rawgit.com/phalt/swapi/d9579f2f/resources/fixtures/vehicles.json';

class VehicleRepository extends Repository {
  query(filters) {
    return this
      .withName(filters.name);
  }

  withName(name) {
    if (!name) return this;
    return this.filter(x => wildcard(x.name, name));
  }

  static async load() {
    const [transports, vehicles] = await Promise.all([
      retrieve(Transport, transportsUrl),
      retrieve(Vehicle, vehiclesUrl),
    ]);

    vehicles.forEach(v => {
      const transport = transports.filter(t => t.id == v.id)[0];
      map(transport, v);
    });

    console.log(`${vehicles.length} vehicles loaded`);
    return new VehicleRepository(vehicles);
  }
}

module.exports = VehicleRepository;
