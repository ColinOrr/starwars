const domain = require('../../domain');

const typeDef = `
  type Vehicle {
    id                     : String
    name                   : String
    model                  : String
    manufacturer           : String
    consumables            : String
    cargo_capacity         : String
    passengers             : String
    max_atmosphering_speed : String
    crew                   : String
    length                 : String
    cost_in_credits        : String
    vehicle_class          : String

    pilots(name: String) : [Person]
  }

  extend type Query {
    vehicles(name: String) : [Vehicle]
  }
`;

const resolvers = {
  Vehicle: {
    pilots: (vehicle, args) => vehicle.pilots.query(args),
  },
  Query: {
    vehicles: (parent, args) => domain.vehicles.query(args),
  },
}

module.exports.typeDef = typeDef;
module.exports.resolvers = resolvers;
