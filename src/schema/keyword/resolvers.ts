import composeQuery from '../../utils/composeQuery';
import normalizeKeys from '../../utils/normalizeKeys';

const keywordListQueryBuilder = ({
  dataSource,
  hasUpcomingEvents,
  page,
  pageSize,
  showAllKeywords,
  sort,
  text,
}: {
  dataSource: string;
  hasUpcomingEvents: boolean;
  page: number;
  pageSize: number;
  showAllKeywords: boolean;
  sort: string;
  text: string;
}) => {
  // Get details of all needed fields
  let query = '';

  if (dataSource) {
    query = composeQuery(query, 'data_source', dataSource);
  }

  if (hasUpcomingEvents) {
    query = composeQuery(query, 'has_upcoming_events', 'true');
  }

  if (page) {
    query = composeQuery(query, 'page', page.toString());
  }

  if (pageSize) {
    query = composeQuery(query, 'page_size', pageSize.toString());
  }

  if (showAllKeywords) {
    query = composeQuery(query, 'show_all_keywords', 'true');
  }

  if (sort) {
    query = composeQuery(query, 'sort', sort);
  }

  if (text) {
    query = composeQuery(query, 'text', text);
  }

  return query;
};

const Query = {
  keywordDetails: async (_, { id }, { dataSources }) => {
    const data = await dataSources.keywordAPI.getKeywordDetails(id);
    return normalizeKeys(data);
  },
  keywordList: async (
    _,
    {
      dataSource,
      hasUpcomingEvents,
      page,
      pageSize,
      showAllKeywords,
      sort,
      text,
    },
    { dataSources }
  ) => {
    const query = keywordListQueryBuilder({
      dataSource,
      hasUpcomingEvents,
      page,
      pageSize,
      showAllKeywords,
      sort,
      text,
    });
    const data = await dataSources.keywordAPI.getKeywordList(query);

    return {
      data: data.data.map(keyword => {
        return normalizeKeys(keyword);
      }),
      meta: data.meta,
    };
  },
};

export default { Query };
