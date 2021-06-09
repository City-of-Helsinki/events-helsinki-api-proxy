/* eslint-disable no-console */
import * as Sentry from '@sentry/node';
import { gql } from 'apollo-server';

import EventAPI from '../datasources/event';
import {
  EventDetails,
  EventListResponse,
  EventTypeId,
  QueryEventListArgs,
} from '../types/types';
import { getApolloTestServer } from '../utils/testUtils';

let errorSpy;

const eventId = 'eventId';
const publisherId = 'publisherId';
const eventName = 'tapahtuma';

let eventAPI: EventAPI;
let apolloTestServer: ReturnType<typeof getApolloTestServer>;

beforeEach(() => {
  errorSpy = jest.spyOn(console, 'error');
  eventAPI = new EventAPI();
  apolloTestServer = getApolloTestServer({
    dataSources: () => ({ eventAPI }),
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
  (eventAPI as any).get = jest.fn().mockResolvedValue(mockData);

  const res = await apolloTestServer.query({ query: EVENTS_QUERY });

  if (res.errors) console.log(res.errors);

  expect(res.data.eventList).toEqual(mockData);
});

it('resolves eventDetails correctly', async () => {
  const mockData = {
    id: eventId,
    publisher: publisherId,
  } as EventDetails;
  (eventAPI as any).get = jest.fn().mockResolvedValue(mockData);

  const res = await apolloTestServer.query({
    query: EVENT_DETAILS_QUERY,
    variables: { id: 'id' },
  });

  if (res.errors) console.log(res.errors);

  expect(res.data.eventDetails).toEqual(mockData);
});

it('resolves eventsByIds correctly', async () => {
  const mockData = {
    data: [
      {
        id: eventId,
        publisher: publisherId,
      },
      {
        id: eventId,
        publisher: publisherId,
      },
    ],
    meta: { count: 2 },
  } as EventListResponse;

  (eventAPI as any).get = jest.fn().mockResolvedValue({ ...mockData });

  const res = await apolloTestServer.query({
    query: EVENTS_BY_IDS_QUERY,
    variables: { ids: ['id1', 'id2'] },
  });

  if (res.errors) console.log(res.errors);
  expect(res.data.eventsByIds).toEqual(mockData);
});

it('handles error correctly in eventsByIds', async () => {
  const spy = jest.spyOn(Sentry, 'captureException');
  const errorMessage = 'Error message';

  // avoid error message in test logs
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  errorSpy.mockImplementationOnce(() => {});

  (eventAPI as any).get = jest
    .fn()
    .mockResolvedValue(Promise.reject(errorMessage));

  await await apolloTestServer.query({
    query: EVENTS_BY_IDS_QUERY,
    variables: { ids: ['id1'] },
  });

  expect(spy.mock.calls).toEqual([[errorMessage]]);
});

describe('sends REST requests correctly', () => {
  it('sends General event type by default', async () => {
    const getMock = jest.fn().mockResolvedValue({});
    (eventAPI as any).get = getMock;

    await apolloTestServer.query({ query: EVENTS_QUERY, variables: {} });

    expect(getMock).toHaveBeenCalledWith('event?event_type=General');
  });

  it('sends Course event type with event type param', async () => {
    const getMock = jest.fn().mockResolvedValue({});
    (eventAPI as any).get = getMock;

    await apolloTestServer.query({
      query: EVENTS_QUERY,
      variables: {
        eventType: [EventTypeId.Course],
      } as QueryEventListArgs,
    });

    expect(getMock).toHaveBeenCalledWith('event?event_type=Course');
  });

  it('sends all params in query string correctly', async () => {
    const getMock = jest.fn().mockResolvedValue({});
    (eventAPI as any).get = getMock;

    await apolloTestServer.query({
      query: EVENTS_QUERY,
      variables: { eventType: [EventTypeId.Course] } as QueryEventListArgs,
    });

    expect(getMock).toHaveBeenCalledWith('event?event_type=Course');
  });
});

it('sends REST request correctly with query params', async () => {
  const getMock = jest.fn().mockResolvedValue({});
  (eventAPI as any).get = getMock;

  await apolloTestServer.query({
    query: EVENTS_QUERY,
    variables: {
      eventType: [EventTypeId.Course],
      ids: ['1', '2'],
      allOngoing: true,
      allOngoingAnd: ['asd'],
      allOngoingOr: ['asf'],
      audienceMaxAgeGt: '10',
      audienceMinAgeGt: '20',
      audienceMaxAgeLt: '10',
      audienceMinAgeLt: '20',
      combinedText: ['asd'],
      division: ['division1', 'division2'],
      end: 'end',
      endsAfter: '09.10.2020',
      endsBefore: '10.10.2020',
      inLanguage: 'fi',
      include: ['include'],
      internetOngoingAnd: ['3', '4'],
      internetOngoingOr: ['5', '6'],
      isFree: true,
      keyword: ['keyword1', 'keyword2'],
      keywordAnd: ['keywordAnd', 'keywordAnd2'],
      language: 'fi',
      keywordNot: ['keywordNot'],
      location: ['location2', 'location3'],
      page: 10,
      pageSize: 10,
      publisher: 'publisher',
      sort: 'asc',
      start: '10.10.2021',
      startsBefore: '10.10.2022',
      text: 'testText',
      translation: 'translation',
      startsAfter: '10.20.2021',
      superEvent: '123aasd',
      superEventType: ['course', 'event'],
    } as QueryEventListArgs,
  });

  expect(getMock).toHaveBeenCalledTimes(1);
  expect(getMock.mock.calls[0][0]).toMatchInlineSnapshot(
    // eslint-disable-next-line max-len
    `"event?event_type=Course&all_ongoing=true&all_ongoing_AND=asd&division=division1,division2&end=end&ends_after=09.10.2020&ends_before=10.10.2020&include=include&in_language=fi&is_free=true&keyword=keyword1,keyword2&keyword_AND=keywordAnd,keywordAnd2&keyword!=keywordNot&language=fi&location=location2,location3&page=10&page_size=10&publisher=publisher&sort=asc&start=10.10.2021&starts_after=10.20.2021&starts_before=10.10.2022&super_event=123aasd&super_event_type=course,event&text=testText&translation=translation"`
  );
});

const EVENTS_BY_IDS_QUERY = gql`
  query EventsByIds(
    $ids: [ID!]!
    $include: [String]
    $sort: String
    $pageSize: Int
  ) {
    eventsByIds(
      ids: $ids
      include: $include
      sort: $sort
      pageSize: $pageSize
    ) {
      data {
        id
        publisher
      }
      meta {
        count
      }
    }
  }
`;

const EVENTS_QUERY = gql`
  query EventList(
    $eventType: [EventTypeId]
    $allOngoing: Boolean
    $allOngoingAnd: [String]
    $division: [String]
    $end: String
    $endsAfter: String
    $endsBefore: String
    $inLanguage: String
    $include: [String]
    $isFree: Boolean
    $keyword: [String]
    $keywordAnd: [String]
    $keywordOrSet1: [String]
    $keywordNot: [String]
    $language: String
    $localOngoingAnd: [String]
    $location: [String]
    $page: Int
    $pageSize: Int
    $publisher: ID
    $sort: String
    $start: String
    $startsAfter: String
    $startsBefore: String
    $superEvent: ID
    $superEventType: [String]
    $text: String
    $translation: String
  ) {
    eventList(
      eventType: $eventType
      allOngoing: $allOngoing
      allOngoingAnd: $allOngoingAnd
      division: $division
      end: $end
      endsAfter: $endsAfter
      endsBefore: $endsBefore
      include: $include
      inLanguage: $inLanguage
      isFree: $isFree
      keyword: $keyword
      keywordAnd: $keywordAnd
      keywordOrSet1: $keywordOrSet1
      keywordNot: $keywordNot
      language: $language
      localOngoingAnd: $localOngoingAnd
      location: $location
      page: $page
      pageSize: $pageSize
      publisher: $publisher
      sort: $sort
      start: $start
      startsAfter: $startsAfter
      startsBefore: $startsBefore
      superEvent: $superEvent
      superEventType: $superEventType
      text: $text
      translation: $translation
    ) {
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
  query EventDetails($id: ID!, $include: [String]) {
    eventDetails(id: $id, include: $include) {
      id
      publisher
    }
  }
`;
