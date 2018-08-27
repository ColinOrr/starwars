const domain = require('../../domain');
const PersonRepository = require('../../domain/personRepository');

const typeDef = `
  type Planet {
    id              : String
    name            : String
    terrain         : String
    climate         : String
    surface_water   : String
    diameter        : String
    rotation_period : String
    gravity         : String
    orbital_period  : String
    population      : String

    people(name: String) : [Person]
  }

  extend type Query {
    planets(name: String) : [Planet]
  }
`;

const resolvers = {
  Planet: {
    people: (planet, args) => new PersonRepository(planet.people).query(args),
  },
  Query: {
    planets: (parent, args) => domain.planets.query(args),
  },
}

module.exports.typeDef = typeDef;
module.exports.resolvers = resolvers;
