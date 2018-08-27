const { ApolloServer, makeExecutableSchema } = require('apollo-server-koa');

const person   = require('./person.js');
const planet   = require('./planet.js');
const species  = require('./species.js');
const starship = require('./starship.js');
const vehicle  = require('./vehicle.js');

const schema = makeExecutableSchema({
  typeDefs: [
    person.typeDef,
    planet.typeDef,
    species.typeDef,
    starship.typeDef,
    vehicle.typeDef,
  ],
  resolvers: [
    person.resolvers,
    planet.resolvers,
    species.resolvers,
    starship.resolvers,
    vehicle.resolvers,
  ],
});

const playground = {
  settings: {
    'editor.cursorShape': 'line',
    'editor.theme': 'light',
  },
};

module.exports = new ApolloServer({ schema, playground });
