import { buildSubgraphSchema } from '@apollo/subgraph';

import resolvers from './resolvers';
import typeDefs from './typeDefs';

const schema = buildSubgraphSchema({
  resolvers,
  typeDefs,
});

export default schema;
