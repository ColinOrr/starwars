const domain = require('../../domain');

const typeDef = `
  "A single transport craft that has hyperdrive capability."
  type Starship {
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
    MGLT                   : String
    starship_class         : String
    hyperdrive_rating      : String

    pilots(name: String) : [Person]
  }

  extend type Query {
    starships(name: String) : [Starship]
  }
`;

const resolvers = {
  Starship: {
    pilots: (starship, args) => starship.pilots.query(args),
  },
  Query: {
    starships: (parent, args) => domain.starships.query(args),
  },
}

module.exports.typeDef = typeDef;
module.exports.resolvers = resolvers;
