import { gql } from "apollo-server";

const typeDefs = gql`
  extend type Query {
    collectionDetails(id: ID): CollectionDetails!
  }

  type CollectionDetails {
    id: ID!
    curatedEvents: [String!]!
    curatedEventsTitle: LocalizedObject!
    description: LocalizedObject!
    eventListQuery: String!
    eventListTitle: LocalizedObject!
    link: CollectionLink!
    shortDescription: LocalizedObject!
    title: LocalizedObject!
  }

  type CollectionLink {
    text: LocalizedObject!
    url: LocalizedObject!
  }
`;

export default typeDefs;
