import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend type Query {
    keywordDetails(id: ID!, source: LinkedEventsSource): Keyword!
    keywordList(
      dataSource: String
      hasUpcomingEvents: Boolean
      page: Int
      pageSize: Int
      showAllKeywords: Boolean
      sort: String
      text: String
      source: LinkedEventsSource
    ): KeywordListResponse!
  }

  type KeywordListResponse {
    meta: Meta!
    data: [Keyword!]!
  }

  type Keyword {
    id: ID
    altLabels: [String]
    createdTime: String
    hasUpcomingEvents: Boolean
    lastModifiedTime: String
    aggregate: Boolean
    deprecated: Boolean
    nEvents: Int
    image: Image
    dataSource: String
    publisher: ID
    name: LocalizedObject
    # @id is renamed as internalId so it's usable on GraphQl
    internalId: String!
    # @context is renamed as internalContext so it's usable on GraphQl
    internalContext: String
    # @type is renamed as internalType so it's usable on GraphQl
    internalType: String
  }
`;

export default typeDefs;
