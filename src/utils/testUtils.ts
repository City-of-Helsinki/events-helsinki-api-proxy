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
    // FIXME: the current createTestClient is not supporting the latest ApolloServer
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    new ApolloServer({
      schema,
      context: () => ({ token: '123' }),
      ...config,
    })
  );
};
