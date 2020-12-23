/* eslint-disable no-console */
import * as Sentry from '@sentry/node';
import { gql } from 'apollo-server';

import CourseAPI from '../datasources/course';
import { EventDetails, EventListResponse } from '../types/types';
import { getApolloTestServer } from '../utils/testUtils';

let errorSpy;

beforeEach(() => {
  errorSpy = jest.spyOn(console, 'error');
});

afterEach(() => {
  (console.error as any).mockRestore();
});

it('resolves eventList correctly', async () => {
  const GET_COURSES = gql`
    {
      courseList {
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

  const courseAPI = new CourseAPI();
  const eventId = 'eventId';
  const eventName = 'tapahtuma';

  courseAPI.get = jest.fn().mockResolvedValue({
    data: [{ id: eventId, name: { fi: eventName } }],
    meta: { count: 1 },
  } as EventListResponse);

  const { query } = getApolloTestServer({ dataSources: () => ({ courseAPI }) });

  const res = await query({ query: GET_COURSES });

  expect(res.data.courseList).toEqual({
    data: [{ id: eventId, name: { fi: eventName } }],
    meta: {
      count: 1,
    },
  });
});

it('resolves eventDetails correctly', async () => {
  const COURSE_DETAILS = gql`
    {
      courseDetails {
        id
        publisher
      }
    }
  `;

  const courseAPI = new CourseAPI();
  const eventId = 'eventId';
  const publisherId = 'publisherId';

  courseAPI.get = jest.fn().mockResolvedValue({
    id: eventId,
    publisher: publisherId,
  } as EventDetails);

  const { query } = getApolloTestServer({ dataSources: () => ({ courseAPI }) });

  const res = await query({ query: COURSE_DETAILS });

  expect(res.data.courseDetails).toEqual({
    id: eventId,
    publisher: publisherId,
  });
});

it('resolves coursesByIds correctly', async () => {
  const COURSE_DETAILS = gql`
    {
      coursesByIds(ids: ["id1", "id2"]) {
        id
        publisher
      }
    }
  `;

  const courseAPI = new CourseAPI();

  const courseId = 'courseId';
  const publisherId = 'publisherId';

  courseAPI.get = jest.fn().mockResolvedValue({
    id: courseId,
    publisher: publisherId,
  } as EventDetails);

  const { query } = getApolloTestServer({ dataSources: () => ({ courseAPI }) });

  const res = await query({ query: COURSE_DETAILS });

  expect(res.data.coursesByIds).toEqual([
    { id: 'courseId', publisher: 'publisherId' },
    { id: 'courseId', publisher: 'publisherId' },
  ]);
});

it('handles error correctly in coursesByIds', async () => {
  const COURSE_DETAILS = gql`
    {
      coursesByIds(ids: ["id1"]) {
        id
        publisher
      }
    }
  `;

  const spy = jest.spyOn(Sentry, 'captureException');
  const errorMessage = 'Error message';

  // avoid error message in test logs
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  errorSpy.mockImplementationOnce(() => {});

  const courseAPI = new CourseAPI();
  const getMock = jest.fn().mockResolvedValue(Promise.reject(errorMessage));
  courseAPI.get = getMock;

  const { query } = getApolloTestServer({ dataSources: () => ({ courseAPI }) });

  await query({ query: COURSE_DETAILS });

  expect(spy.mock.calls).toEqual([[errorMessage]]);
  expect(console.error).toHaveBeenCalled();
});
