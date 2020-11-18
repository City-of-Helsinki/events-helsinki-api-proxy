import { QueryKeywordListArgs, QueryResolvers } from '../../types/types';
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
}: QueryKeywordListArgs) => {
  // Get details of all needed fields
  let query = '';

  if (dataSource) {
    query = composeQuery(query, 'data_source', dataSource);
  }

  if (hasUpcomingEvents != null) {
    query = composeQuery(
      query,
      'has_upcoming_events',
      hasUpcomingEvents ? 'true' : 'false'
    );
  }

  if (page) {
    query = composeQuery(query, 'page', page.toString());
  }

  if (pageSize) {
    query = composeQuery(query, 'page_size', pageSize.toString());
  }

  if (showAllKeywords != null) {
    query = composeQuery(
      query,
      'show_all_keywords',
      showAllKeywords ? 'true' : 'false'
    );
  }

  if (sort) {
    query = composeQuery(query, 'sort', sort);
  }

  if (text) {
    query = composeQuery(query, 'text', text);
  }

  return query;
};

const Query: QueryResolvers = {
  keywordDetails: async (_, { id, source }, { dataSources }) => {
    const data = await dataSources.keywordAPI.getKeywordDetails(id, source);
    return normalizeKeys(data);
  },
  keywordList: async (_, params, { dataSources }) => {
    const query = keywordListQueryBuilder(params);
    const data = await dataSources.keywordAPI.getKeywordList(
      query,
      params.source
    );

    return {
      data: data.data.map((keyword) => {
        return normalizeKeys(keyword);
      }),
      meta: data.meta,
    };
  },
};

export default { Query };
