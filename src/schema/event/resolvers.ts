import * as Sentry from '@sentry/node';

import { DataSources, QueryResolvers } from '../../types';
import normalizeKeys from '../../utils/normalizeKeys';
import { buildEventDetailsQuery, buildEventListQuery } from './utils';

const getEventList = async (dataSources: DataSources, query: string) => {
  try {
    const data = await dataSources.eventAPI.getEventList(query);
    return {
      data: data.data.map((event) => {
        return normalizeKeys(event);
      }),
      meta: data.meta,
    };
  } catch (e) {
    Sentry.captureException(e);
    throw new Error(e);
  }
};

const Query: QueryResolvers = {
  eventDetails: async (_, { id, include }, { dataSources }) => {
    const query = buildEventDetailsQuery(include);
    const data = await dataSources.eventAPI.getEventDetails(id, query);
    return normalizeKeys(data);
  },
  eventList: async (_, params, { dataSources }) => {
    const query = buildEventListQuery(params);
    return getEventList(dataSources, query);
  },
  eventsByIds: async (_, { ids, include, sort, pageSize }, { dataSources }) => {
    const query = buildEventListQuery({ ids, include, sort, pageSize });
    return getEventList(dataSources, query);
  },
};

export default { Query };
