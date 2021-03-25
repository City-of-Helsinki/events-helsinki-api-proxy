/* eslint-disable no-console */
import * as Sentry from '@sentry/node';
import { gql } from 'apollo-server';

import CourseAPI from '../datasources/course';
import EventAPI from '../datasources/event';
import {
  EventDetails,
  EventListResponse,
  LinkedEventsSource,
} from '../types/types';
import { getApolloTestServer } from '../utils/testUtils';

let errorSpy;

const eventId = 'eventId';
const publisherId = 'publisherId';
const eventName = 'tapahtuma';

let eventAPI: EventAPI;
let courseAPI: CourseAPI;
let apolloTestServer: ReturnType<typeof getApolloTestServer>;

beforeEach(() => {
  errorSpy = jest.spyOn(console, 'error');
  eventAPI = new EventAPI();
  courseAPI = new CourseAPI();
  apolloTestServer = getApolloTestServer({
    dataSources: () => ({ eventAPI, courseAPI }),
  });
});

afterEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (console.error as any).mockRestore();
});

it('resolves eventList correctly', async () => {
  const mockData = {
    data: [{ id: eventId, name: { fi: eventName } }],
    meta: { count: 1 },
  } as EventListResponse;
  eventAPI.get = jest.fn().mockResolvedValue(mockData);

  const res = await apolloTestServer.query({ query: EVENTS_QUERY });

  expect(res.data.eventList).toEqual(mockData);
});

it('resolves eventDetails correctly', async () => {
  const mockData = {
    id: eventId,
    publisher: publisherId,
  } as EventDetails;
  eventAPI.get = jest.fn().mockResolvedValue(mockData);

  const res = await apolloTestServer.query({ query: EVENT_DETAILS_QUERY });

  expect(res.data.eventDetails).toEqual(mockData);
});

it('resolves eventsByIds correctly', async () => {
  const mockData = [
    {
      id: eventId,
      publisher: publisherId,
    },
    {
      id: eventId,
      publisher: publisherId,
    },
  ] as EventDetails[];
  eventAPI.get = jest.fn().mockResolvedValue({ data: mockData });

  const res = await apolloTestServer.query({
    query: EVENTS_BY_IDS_QUERY,
    variables: { ids: ['id1', 'id2'] },
  });

  expect(res.data.eventsByIds).toEqual(mockData);
});

it('handles error correctly in eventsByIds', async () => {
  const spy = jest.spyOn(Sentry, 'captureException');
  const errorMessage = 'Error message';

  // avoid error message in test logs
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  errorSpy.mockImplementationOnce(() => {});

  eventAPI.get = jest.fn().mockResolvedValue(Promise.reject(errorMessage));

  await await apolloTestServer.query({
    query: EVENTS_BY_IDS_QUERY,
    variables: { ids: ['id1'] },
  });

  expect(spy.mock.calls).toEqual([[errorMessage]]);
});

describe('source argument works correctly', () => {
  it('resolves eventsByIds with LINKEDCOURSES source', async () => {
    const mockData = {
      id: eventId,
      publisher: publisherId,
    } as EventDetails;

    courseAPI.get = jest.fn().mockResolvedValue({ data: mockData });

    const res = await apolloTestServer.query({
      query: EVENTS_BY_IDS_QUERY,
      variables: {
        ids: ['id1', 'id2'],
        source: LinkedEventsSource.Linkedcourses,
      },
    });

    expect(res.data.eventsByIds).toEqual([mockData, mockData]);
  });

  it('resolves eventsByIds with LINKEDEVENTS source', async () => {
    const mockData = [
      {
        id: eventId,
        publisher: publisherId,
      },
      {
        id: eventId,
        publisher: publisherId,
      },
    ] as EventDetails[];
    eventAPI.get = jest.fn().mockResolvedValue({ data: mockData });

    const res = await apolloTestServer.query({
      query: EVENTS_BY_IDS_QUERY,
      variables: {
        ids: ['id1', 'id2'],
        source: LinkedEventsSource.Linkedevents,
      },
    });

    expect(res.data.eventsByIds).toEqual(mockData);
  });
});

const EVENTS_BY_IDS_QUERY = gql`
  query EventsByIds(
    $ids: [ID!]!
    $include: [String]
    $source: LinkedEventsSource
  ) {
    eventsByIds(ids: $ids, include: $include, source: $source) {
      id
      publisher
    }
  }
`;

const EVENTS_QUERY = gql`
  {
    eventList {
      data {
        id
        name {
          fi
        }
      }
      meta {
        count
      }
    }
  }
`;

const EVENT_DETAILS_QUERY = gql`
  {
    eventDetails {
      id
      publisher
    }
  }
`;
