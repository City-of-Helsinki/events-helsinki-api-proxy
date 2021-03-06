import { QueryResolvers } from '../../types';
import composeQuery from '../../utils/composeQuery';
import normalizeKeys from '../../utils/normalizeKeys';

const Query: QueryResolvers = {
  placeDetails: async (_, { id }, { dataSources }) => {
    const data = await dataSources.placeAPI.getPlaceDetails(id);
    return normalizeKeys(data);
  },
  placeList: async (
    _,
    {
      dataSource,
      divisions,
      hasUpcomingEvents,
      page,
      pageSize,
      showAllPlaces,
      sort,
      text,
    },
    { dataSources }
  ) => {
    const query = placeListQueryBuilder({
      dataSource,
      divisions,
      hasUpcomingEvents,
      page,
      pageSize,
      showAllPlaces,
      sort,
      text,
    });
    const data = await dataSources.placeAPI.getPlaceList(query);

    return {
      data: data.data.map((place) => {
        return normalizeKeys(place);
      }),
      meta: data.meta,
    };
  },
};

const placeListQueryBuilder = ({
  dataSource,
  divisions,
  hasUpcomingEvents,
  page,
  pageSize,
  showAllPlaces,
  sort,
  text,
}: {
  dataSource: string;
  divisions: string[];
  hasUpcomingEvents: boolean;
  page: number;
  pageSize: number;
  showAllPlaces: boolean;
  sort: string;
  text: string;
}) => {
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

  if (divisions && divisions.length) {
    query = composeQuery(query, 'division', divisions.join(','));
  }

  if (page) {
    query = composeQuery(query, 'page', page.toString());
  }

  if (pageSize) {
    query = composeQuery(query, 'page_size', pageSize.toString());
  }

  if (showAllPlaces != null) {
    query = composeQuery(
      query,
      'show_all_places',
      showAllPlaces ? 'true' : 'false'
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

export default { Query };
