const domain = require('../../domain');

const typeDef = `
  "An individual person or character within the Star Wars universe."
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
    species    : Species
    homeworld  : Planet

    starships(name: String) : [Starship]
    vehicles(name: String)  : [Vehicle]
  }

  type Query {
    people(name: String) : [Person]
  }
`;

const resolvers = {
  Person: {
    starships: (person, args) => person.starships.query(args),
    vehicles : (person, args) => person.vehicles.query(args),
  },
  Query: {
    people: (parent, args) => domain.people.query(args),
  },
}

module.exports.typeDef = typeDef;
module.exports.resolvers = resolvers;
