import { gql } from "apollo-server";

const typeDefs = gql`
  extend type Query {
    placeList(
      dataSource: String
      divisions: [String]
      page: Int
      pageSize: Int
      showAllPlaces: Boolean
      sort: String
      text: String
    ): PlaceListResponse!
  }

  type PlaceListResponse {
    meta: Meta!
    data: [Place!]!
  }

  type Place {
    id: ID!
    divisions: [Division!]
    createdTime: String
    lastModifiedTime: String
    customData: String
    email: String
    contactType: String
    addressRegion: String
    postalCode: String
    postOfficeBoxNum: String
    addressCountry: String
    deleted: Boolean
    nEvents: Int
    image: Image
    dataSource: String
    publisher: ID
    parent: ID
    replacedBy: String
    position: PlacePosition
    name: LocalizedObject
    description: String
    telephone: LocalizedObject
    addressLocality: LocalizedObject
    streetAddress: LocalizedObject
    infoUrl: LocalizedObject
    internalId: String
    internalContext: String
    internalType: String
  }

  type Division {
    type: String!
    ocdId: String
    municipality: String
    name: LocalizedObject
  }

  type PlacePosition {
    type: String!
    coordinates: [Float!]!
  }
`;

export default typeDefs;
