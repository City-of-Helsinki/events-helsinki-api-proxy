import { gql } from 'apollo-server';

const typeDefs = gql`
  extend type Query {
    collectionDetails(slug: ID, draft: Boolean): CollectionDetails!
    collectionList(visibleOnFrontpage: Boolean): CollectionListResponse!
  }

  type CollectionListResponse {
    data: [CollectionDetails!]!
  }

  type CollectionDetails {
    id: ID!
    boxColor: String
    contentType: Int
    curatedEvents: [String!]!
    curatedEventsTitle: LocalizedObject
    depth: Int
    description: LocalizedObject
    draftTitle: String
    eventListQuery: LocalizedObject
    eventListTitle: LocalizedObject
    expireAt: String
    expired: Boolean
    firstPublishedAt: String
    goLiveAt: String
    hasUnpublishedChanges: Boolean
    heroImage: CmsImage
    lastPublishedAt: String
    latestRevisionCreatedAt: String
    linkText: LocalizedObject
    linkUrl: LocalizedObject
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
    slug: ID!
    socialMediaDescription: LocalizedObject
    title: LocalizedObject!
    urlPath: String
  }
`;

export default typeDefs;
