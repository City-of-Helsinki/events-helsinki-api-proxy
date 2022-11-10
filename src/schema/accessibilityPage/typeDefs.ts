import { gql } from 'graphql-tag';

const typeDefs = gql`
  extend type Query {
    accessibilityPages: AccessibilityPagesResponse!
  }

  type AccessibilityPagesResponse {
    data: [StaticPage!]!
  }
`;

export default typeDefs;
