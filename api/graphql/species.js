const domain = require('../../domain');
const PersonRepository = require('../../domain/personRepository');

const typeDef = `
  type Species {
    id               : String
    name             : String
    classification   : String
    designation      : String
    eye_colors       : String
    skin_colors      : String
    language         : String
    hair_colors      : String
    homeworld        : String
    average_lifespan : String
    average_height   : String

    people(name: String) : [Person]
  }

  extend type Query {
    species(name: String) : [Species]
  }
`;

const resolvers = {
  Species: {
    people: (species, args) => new PersonRepository(species.people).query(args),
  },
  Query: {
    species: (parent, args) => domain.species.query(args),
  },
}

module.exports.typeDef = typeDef;
module.exports.resolvers = resolvers;
