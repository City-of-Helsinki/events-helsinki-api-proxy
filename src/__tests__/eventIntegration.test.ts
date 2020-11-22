import { gql } from 'apollo-server';

import EventAPI from '../datasources/event';
import { EventDetails, EventListResponse } from '../types/types';
import { getApolloTestServer } from '../utils/testUtils';

it('resolves eventList correctly', async () => {
  const GET_EVENTS = gql`
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

  const eventAPI = new EventAPI();

  const eventId = 'eventId';
  const eventName = 'tapahtuma';

  const eventMock = jest.fn().mockResolvedValue({
    data: [{ id: eventId, name: { fi: eventName } }],
    meta: { count: 1 },
  } as EventListResponse);

  eventAPI.get = eventMock;

  const { query } = getApolloTestServer({ dataSources: () => ({ eventAPI }) });

  const res = await query({ query: GET_EVENTS });

  expect(res.data.eventList).toEqual({
    data: [{ id: eventId, name: { fi: eventName } }],
    meta: {
      count: 1,
    },
  });
});

it('resolves eventDetails correctly', async () => {
  const EVENT_DETAILS = gql`
    {
      eventDetails {
        id
        publisher
      }
    }
  `;

  const eventAPI = new EventAPI();

  const eventId = 'eventId';
  const publisherId = 'publisherId';

  eventAPI.get = jest.fn().mockResolvedValue({
    id: eventId,
    publisher: publisherId,
  } as EventDetails);

  const { query } = getApolloTestServer({ dataSources: () => ({ eventAPI }) });

  const res = await query({ query: EVENT_DETAILS });

  expect(res.data.eventDetails).toEqual({
    id: eventId,
    publisher: publisherId,
  });
});

it('resolves eventsByIds correctly', async () => {
  const EVENT_DETAILS = gql`
    {
      eventsByIds(ids: ["id1", "id2"]) {
        id
        publisher
      }
    }
  `;

  const eventAPI = new EventAPI();

  const eventId = 'eventId';
  const publisherId = 'publisherId';

  const getMock = jest.fn().mockResolvedValue({
    id: eventId,
    publisher: publisherId,
  } as EventDetails);

  eventAPI.get = getMock;

  const { query } = getApolloTestServer({ dataSources: () => ({ eventAPI }) });

  const res = await query({ query: EVENT_DETAILS });

  expect(res.data.eventsByIds).toEqual([
    { id: 'eventId', publisher: 'publisherId' },
    { id: 'eventId', publisher: 'publisherId' },
  ]);
});
