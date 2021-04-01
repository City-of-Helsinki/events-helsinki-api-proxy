import { gql } from 'apollo-server';

const typeDefs = gql`
  extend type Query {
    wpPages(slug: String!): WpPagesResponse!
  }

  type WpPagesResponse {
    data: [WPStaticPage!]
  }
`;

export default typeDefs;
