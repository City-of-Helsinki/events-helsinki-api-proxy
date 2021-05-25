import { gql } from 'apollo-server';

export const Query = gql`
  type Query {
    _empty: String
  }
`;
export const Mutation = gql`
  type Mutation {
    _empty: String
  }
`;
export const Subscription = gql`
  type Subscription {
    _empty: String
  }
`;

export const InternalIdObject = gql`
  type InternalIdObject {
    # @id is renamed as internalId so it's usable on GraphQl
    internalId: String
  }
`;

export const LocalizedObject = gql`
  type LocalizedObject {
    fi: String
    sv: String
    en: String
  }
`;

export const CmsImage = gql`
  type CmsImage {
    photographerCredit: LocalizedObject
    url: String
    title: String
  }
`;

export const LocalizedCmsImage = gql`
  type LocalizedCmsImage {
    en: CmsImage
    fi: CmsImage
    sv: CmsImage
  }
`;

export const LocalizedCmsKeywords = gql`
  type LocalizedCmsKeywords {
    en: [String]
    fi: [String]
    sv: [String]
  }
`;

export const Meta = gql`
  type Meta {
    count: Int!
    next: String
    previous: String
  }
`;

export const StaticPage = gql`
  type StaticPage {
    id: ID!
    path: String
    depth: Int
    numchild: Int
    title: String
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
    keywords: LocalizedCmsKeywords
    lastPublishedAt: String
    latestRevisionCreatedAt: String
    headingSection: LocalizedObject
    contentSection: LocalizedObject
    contentYype: Int
    owner: Int
    lockedBy: String
    liveRevision: Int
  }
`;

export const Enums = gql`
  enum EventTypeId {
    General
    Course
  }
`;

export const BannerPage = gql`
  type BannerPage {
    title: LocalizedObject
    description: LocalizedObject
    keywords: LocalizedCmsKeywords
    titleAndDescriptionColor: LocalizedObject
    buttonText: LocalizedObject
    buttonUrl: LocalizedObject
    heroBackgroundImage: LocalizedCmsImage
    heroBackgroundImageMobile: LocalizedCmsImage
    heroBackgroundImageColor: LocalizedObject
    heroTopLayerImage: LocalizedCmsImage
    socialMediaImage: LocalizedCmsImage
  }
`;

const globalDefs = [
  CmsImage,
  InternalIdObject,
  LocalizedCmsImage,
  LocalizedCmsKeywords,
  LocalizedObject,
  Meta,
  Mutation,
  Query,
  StaticPage,
  BannerPage,
  Subscription,
  Enums,
];

export default globalDefs;
