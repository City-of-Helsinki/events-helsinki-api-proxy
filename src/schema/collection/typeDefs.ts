import { gql } from "apollo-server";

const typeDefs = gql`
  extend type Query {
    collectionDetails(id: ID): CollectionDetails!
  }

  type CollectionDetails {
    id: ID!
    curatedEvents: [String!]!
    curatedEventsTitle: LocalizedObject!
    eventListQuery: String!
    eventListTitle: LocalizedObject!
  }
`;

export default typeDefs;
