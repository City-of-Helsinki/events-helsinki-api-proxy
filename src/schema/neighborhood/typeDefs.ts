import { gql } from "apollo-server";

const typeDefs = gql`
  extend type Query {
    neighborhoodList: NeighborhoodListResponse!
  }

  type NeighborhoodListResponse {
    meta: Meta!
    data: [Neighborhood!]!
  }

  type Neighborhood {
    id: ID!
    name: LocalizedObject!
  }
`;

export default typeDefs;
