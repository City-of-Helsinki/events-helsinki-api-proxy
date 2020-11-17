import { gql } from 'apollo-server';

const typeDefs = gql`
  extend type Query {
    courseDetails(id: ID, include: [String]): EventDetails!
    courseList(
      combinedText: [String]
      division: [String]
      end: String
      endsAfter: String
      endsBefore: String
      inLanguage: String
      include: [String]
      isFree: Boolean
      keywordAnd: [String]
      keywordNot: [String]
      keyword: [String]
      language: String
      location: [String]
      page: Int
      pageSize: Int
      publisher: ID
      sort: String
      start: String
      startsAfter: String
      startsBefore: String
      superEvent: ID
      superEventType: [String]
      text: String
      translation: String
    ): EventListResponse!
    coursesByIds(ids: [ID!]!, include: [String]): [EventDetails!]!
  }

  extend type EventDetails {
    extensionCourse: ExtensionCourse
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
