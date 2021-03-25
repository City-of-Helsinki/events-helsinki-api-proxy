import { gql } from 'apollo-server';

import { linkedEventsBaseArgs } from '../common';

const typeDefs = gql`
  extend type Query {
    eventDetails(id: ID, include: [String], source: LinkedEventsSource): EventDetails!
    eventList(${linkedEventsBaseArgs}, source: LinkedEventsSource): EventListResponse!
    eventsByIds(ids: [ID!]!, include: [String], source: LinkedEventsSource): [EventDetails!]!
  }

  type EventListResponse {
    meta: Meta!
    data: [EventDetails!]!
  }

  type EventDetails {
    id: ID!
    location: Place
    keywords: [Keyword!]!
    superEvent: InternalIdObject
    eventStatus: String
    externalLinks: [ExternalLink!]!
    offers: [Offer!]!
    dataSource: String
    publisher: ID
    subEvents: [InternalIdObject!]!
    images: [Image!]!
    inLanguage: [InLanguage!]!
    audience: [Audience!]!
    createdTime: String
    lastModifiedTime: String
    datePublished: String
    startTime: String
    endTime: String
    customData: String
    audienceMinAge: String
    audienceMaxAge: String
    superEventType: String
    name: LocalizedObject!
    locationExtraInfo: LocalizedObject
    shortDescription: LocalizedObject
    provider: LocalizedObject
    infoUrl: LocalizedObject
    providerContactInfo: String
    description: LocalizedObject
    # @id is renamed as internalId so it's usable on GraphQl
    internalId: String
    # @context is renamed as internalContext so it's usable on GraphQl
    internalContext: String
    # @type is renamed as internalType so it's usable on GraphQl
    internalType: String
  }

  type Audience {
    id: ID
    name: LocalizedObject
    internalId: String
    internalContext: String
    internalType: String
  }

  type ExternalLink {
    name: String
    link: String
    language: String
  }

  type InLanguage {
    id: ID
    translationAvailable: Boolean
    name: LocalizedObject
    # @id is renamed as internalId so it's usable on GraphQl
    internalId: String
    # @context is renamed as internalContext so it's usable on GraphQl
    internalContext: String
    # @type is renamed as internalType so it's usable on GraphQl
    internalType: String
  }

  type Offer {
    isFree: Boolean
    description: LocalizedObject
    price: LocalizedObject
    infoUrl: LocalizedObject
  }

  type Image {
    id: ID
    license: String
    createdTime: String
    lastModifiedTime: String
    name: String!
    url: String!
    cropping: String
    photographerName: String
    dataSource: String
    publisher: String
    # @id is renamed as internalId so it's usable on GraphQl
    internalId: String!
    # @context is renamed as internalContext so it's usable on GraphQl
    internalContext: String
    # @type is renamed as internalType so it's usable on GraphQl
    internalType: String
  }
`;

export default typeDefs;
