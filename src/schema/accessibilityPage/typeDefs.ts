import { gql } from 'apollo-server';

const typeDefs = gql`
  extend type Query {
    accessibilityPages: AccessibilityPageResponse!
  }

  type AccessibilityPageResponse {
    data: [StaticPage!]!
  }
`;

export default typeDefs;
