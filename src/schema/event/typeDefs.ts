import { gql } from "apollo-server";

const typeDefs = gql`
  extend type Query {
    eventDetails(id: ID): EventDetails!
    eventList(
      divisions: [String]
      endDate: String
      include: [String]
      inLanguage: String
      keywords: [String]
      language: String
      locations: [String]
      page: Int
      pageSize: Int
      publisher: ID
      sort: String
      startDate: String
      text: String
      translation: String
    ): EventListResponse!
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
    audience: [InternalIdObject!]!
    createdTime: String
    lastModifiedTime: String
    datePublished: String
    startTime: String
    endTime: String
    customData: String
    audienceMinAge: String
    audienceMaxAge: String
    superEventType: String
    extensionCourse: ExtensionCourse
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

  type ExternalLink {
    name: String
    link: String
    language: String
  }

  type InLanguage {
    id: ID!
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
    id: ID!
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
    internalId: String
    # @context is renamed as internalContext so it's usable on GraphQl
    internalContext: String
    # @type is renamed as internalType so it's usable on GraphQl
    internalType: String
  }

  type ExtensionCourse {
    enrolmentStartTime: String
    enrolmentEndTime: String
    maximumAttendeeCapacity: Int
    minimumAttendeeCapacity: Int
    remainingAttendeeCapacity: Int
  }
`;

export default typeDefs;
