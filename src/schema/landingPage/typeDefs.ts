import { gql } from "apollo-server";

const typeDefs = gql`
  extend type Query {
    landingPage: LandingPage!
  }

  type LandingPage {
    id: ID!
    path: String
    depth: Int
    numchild: Int
    draftTitle: String
    slug: String
    live: Boolean
    hasUnpublishedChanges: Boolean
    urlPath: String
    seoTitle: String
    showInMenus: Boolean
    searchDescription: String
    goLiveAt: String
    expireAt: String
    expired: Boolean
    locked: Boolean
    lockedAt: String
    firstPublishedAt: String
    lastPublishedAt: String
    latestRevisionCreatedAt: String
    title: LocalizedObject
    description: LocalizedObject
    buttonText: LocalizedObject
    buttonUrl: LocalizedObject
    metaInformation: LocalizedObject
    pageTitle: LocalizedObject
    contentType: Int
    owner: Int
    lockedBy: Int
    liveRevision: Int
  }
`;

export default typeDefs;
