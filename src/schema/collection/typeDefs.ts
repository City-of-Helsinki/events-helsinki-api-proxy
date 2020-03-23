import { gql } from "apollo-server";

const typeDefs = gql`
  extend type Query {
    collectionDetails(id: ID): CollectionDetails!
    collectionList: CollectionListResponse!
  }

  type CollectionListResponse {
    data: [CollectionDetails!]!
  }

  type CollectionDetails {
    id: ID!
    contentType: Int
    curatedEvents: [String!]!
    curatedEventsTitle: LocalizedObject!
    depth: Int
    description: LocalizedObject!
    draftTitle: String
    eventListQuery: String
    eventListTitle: LocalizedObject!
    expireAt: String
    expired: Boolean
    firstPublishedAt: String
    goLiveAt: String
    hasUnpublishedChanges: Boolean
    lastPublishedAt: String
    latestRevisionCreatedAt: String
    linkText: LocalizedObject!
    linkUrl: LocalizedObject!
    live: Boolean
    liveRevision: Int
    locked: Boolean
    lockedAt: String
    lockedBy: Int
    numchild: Int
    owner: Int
    path: String
    searchDescription: String
    seoTitle: String
    showInMenus: Boolean
    similarCollectionsTitle: LocalizedObject
    slug: String
    socialMediaDescription: LocalizedObject
    subtitles: LocalizedObject!
    title: LocalizedObject!
    urlPath: String
  }
`;

export default typeDefs;
