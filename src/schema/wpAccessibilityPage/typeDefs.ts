import { gql } from 'apollo-server';

const typeDefs = gql`
  extend type Query {
    wpAccessibilityPages: WpAccessibilityPagesResponse!
  }

  type WpAccessibilityPagesResponse {
    data: [WPStaticPage!]
  }
`;

export default typeDefs;
