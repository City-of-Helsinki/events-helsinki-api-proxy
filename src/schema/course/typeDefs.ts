import { gql } from 'apollo-server';

import { linkedEventsBaseArgs } from '../common';

const typeDefs = gql`
  extend type Query {
    courseDetails(id: ID, include: [String]): EventDetails!
    courseList(${linkedEventsBaseArgs}): EventListResponse!
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
