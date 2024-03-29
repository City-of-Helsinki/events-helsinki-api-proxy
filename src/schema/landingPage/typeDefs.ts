import { gql } from 'graphql-tag';

const typeDefs = gql`
  extend type Query {
    landingPage(draft: Boolean, id: ID!): LandingPage!
    landingPages(visibleOnFrontpage: Boolean): LandingPagesResponse!
  }

  type LandingPagesResponse {
    data: [LandingPage!]!
  }

  type LandingPage {
    id: ID!
    topBanner: BannerPage
    bottomBanner: BannerPage
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
    keywords: LocalizedCmsKeywords
    metaInformation: LocalizedObject
    pageTitle: LocalizedObject
    contentType: Int
    owner: Int
    lockedBy: Int
    liveRevision: Int
  }
`;

export default typeDefs;
