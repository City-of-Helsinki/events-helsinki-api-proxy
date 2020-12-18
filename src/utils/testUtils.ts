import { ApolloServer } from 'apollo-server';
import { ApolloServerExpressConfig } from 'apollo-server-express';
import {
  ApolloServerTestClient,
  createTestClient,
} from 'apollo-server-testing';

import schema from '../schema/schema';

export const getApolloTestServer = (
  config?: Partial<ApolloServerExpressConfig>
): ApolloServerTestClient => {
  return createTestClient(
    new ApolloServer({
      schema,
      context: () => ({ token: '123' }),
      ...config,
    })
  );
};
