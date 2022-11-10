import { gql } from 'graphql-tag';

const typeDefs = gql`
  extend type Query {
    aboutPages: AboutPagesResponse!
  }

  type AboutPagesResponse {
    data: [StaticPage!]!
  }
`;

export default typeDefs;
