import express from 'express';
import Schema from './data/schema';
import Mocks from './data/mocks';
import Resolvers from './data/resolvers';

import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { apolloExpress, graphiqlExpress } from 'apollo-server';
import bodyParser from 'body-parser';

const GRAPHQL_PORT = 8080;

const graphQLServer = express();
const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
  allowUndefinedInResolve: false,
  printErrors: true,
});

addMockFunctionsToSchema({
  schema: executableSchema,
  preserveResolvers: true,
});

// `context` must be an object and can't be undefined when using connectors
graphQLServer.use('/graphql', bodyParser.json(), apolloExpress({
  schema: executableSchema,
  context: {},
}));

graphQLServer.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));
