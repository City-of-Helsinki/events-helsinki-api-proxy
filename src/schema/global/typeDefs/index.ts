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
    photographerCredit: String
    url: String
  }
`;

export const LocalizedCmsImage = gql`
  type LocalizedCmsImage {
    en: CmsImage
    fi: CmsImage
    sv: CmsImage
  }
`;

export const Meta = gql`
  type Meta {
    count: Int!
    next: String
    previous: String
  }
`;

const global = [
  CmsImage,
  InternalIdObject,
  LocalizedCmsImage,
  LocalizedObject,
  Meta,
  Mutation,
  Query,
  Subscription,
];

export default global;
