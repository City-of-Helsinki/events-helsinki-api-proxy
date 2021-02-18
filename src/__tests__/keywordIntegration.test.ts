/* eslint-disable no-console */
import { gql } from 'apollo-server';

import KeywordAPI from '../datasources/keyword';
import { getApolloTestServer } from '../utils/testUtils';

const GET_KEYWORDS = gql`
  query KewordList($source: LinkedEventsSource) {
    keywordList(source: $source) {
      data {
        id
        internalId
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

it('resolves keywordList correctly', async () => {
  const keywordAPI = new KeywordAPI();

  const keywordResponse = {
    data: [
      {
        id: '1',
        '@id': '1',
        name: {
          fi: 'keyword1',
        },
      },
      {
        id: '2',
        '@id': '2',
        name: {
          fi: 'keyword2',
        },
      },
    ],
    meta: {
      count: 1,
    },
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (keywordAPI as any).get = jest.fn().mockResolvedValue(keywordResponse);

  const { query } = getApolloTestServer({
    dataSources: () => ({ keywordAPI }),
  });

  const res = await query({ query: GET_KEYWORDS });

  if (res.errors) console.log(res.errors);

  expect(res.data.keywordList).toEqual({
    data: [
      {
        id: '1',
        internalId: '1',
        name: {
          fi: 'keyword1',
        },
      },
      {
        id: '2',
        internalId: '2',
        name: {
          fi: 'keyword2',
        },
      },
    ],
    meta: {
      count: 1,
    },
  });
});

it('uses correct path when source is provided', async () => {
  const keywordAPI = new KeywordAPI();

  const getMock = jest.fn();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (keywordAPI as any).get = getMock;

  const { query } = getApolloTestServer({
    dataSources: () => ({ keywordAPI }),
  });

  await query({
    query: GET_KEYWORDS,
    variables: { source: 'LINKEDEVENTS' },
  });

  expect(getMock).toHaveBeenCalledWith('/linkedevents/v1/keyword');

  await query({
    query: GET_KEYWORDS,
    variables: { source: 'LINKEDCOURSES' },
  });

  expect(getMock).toHaveBeenCalledWith('/linkedcourses/v1/keyword');
});
