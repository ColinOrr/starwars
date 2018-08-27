const domain = require('../../domain');
const StarshipRepository = require('../../domain/starshipRepository');
const VehicleRepository  = require('../../domain/vehicleRepository');

const typeDef = `
  type Person {
    id         : String
    name       : String
    gender     : String
    skin_color : String
    hair_color : String
    height     : String
    eye_color  : String
    mass       : String
    birth_year : String

    species   : Species
    homeworld : Planet
    starships : [Starship]
    vehicles  : [Vehicle]
  }

  type Query {
    people(name: String) : [Person]
  }
`;

const resolvers = {
  Person: {
    starships: (person, args) => new StarshipRepository(person.starships).query(args),
    vehicles : (person, args) => new VehicleRepository(person.vehicles).query(args),
  },
  Query: {
    people: (parent, args) => domain.people.query(args),
  },
}

module.exports.typeDef = typeDef;
module.exports.resolvers = resolvers;
