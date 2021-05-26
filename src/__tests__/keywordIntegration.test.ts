/* eslint-disable no-console */
import { gql } from 'apollo-server';

import KeywordAPI from '../datasources/keyword';
import { getApolloTestServer } from '../utils/testUtils';

it('sends REST request correctly with params', async () => {
  const keywordAPI = new KeywordAPI();

  const keywordResponse = {
    data: [],
    meta: {},
  };

  const getMock = jest.fn().mockResolvedValue(keywordResponse);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (keywordAPI as any).get = getMock;

  const { query } = getApolloTestServer({
    dataSources: () => ({ keywordAPI }),
  });

  await query({
    query: GET_KEYWORDS,
    variables: {
      dataSource: 'yso',
      hasUpcomingEvents: true,
      page: 1,
      pageSize: 10,
      showAllKeywords: false,
      sort: 'asc',
      text: 'malmi',
    },
  });

  expect(getMock).toHaveBeenCalledWith(
    'keyword?data_source=yso&has_upcoming_events=true&page=1&page_size=10&show_all_keywords=false&sort=asc&text=malmi'
  );
});

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
  });

  expect(getMock).toHaveBeenCalledWith('keyword');

  await query({
    query: GET_KEYWORDS,
  });

  expect(getMock).toHaveBeenCalledWith('keyword');
});

const GET_KEYWORDS = gql`
  query KewordList(
    $dataSource: String
    $hasUpcomingEvents: Boolean
    $page: Int
    $pageSize: Int
    $showAllKeywords: Boolean
    $sort: String
    $text: String
  ) {
    keywordList(
      dataSource: $dataSource
      hasUpcomingEvents: $hasUpcomingEvents
      page: $page
      pageSize: $pageSize
      showAllKeywords: $showAllKeywords
      sort: $sort
      text: $text
    ) {
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
