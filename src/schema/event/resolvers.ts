import * as Sentry from '@sentry/node';

import { QueryResolvers } from '../../types/types';
import normalizeKeys from '../../utils/normalizeKeys';
import { buildEventDetailsQuery, buildEventListQuery } from './utils';

const Query: QueryResolvers = {
  eventDetails: async (_, { id, include }, { dataSources }) => {
    const query = buildEventDetailsQuery(include);
    const data = await dataSources.eventAPI.getEventDetails(id, query);

    return normalizeKeys(data);
  },
  eventList: async (_, params, { dataSources }) => {
    const query = buildEventListQuery(params);
    const data = await dataSources.eventAPI.getEventList(query);

    return {
      data: data.data.map((event) => {
        return normalizeKeys(event);
      }),
      meta: data.meta,
    };
  },
  eventsByIds: async (_, { ids, include }, { dataSources }) => {
    const query = buildEventListQuery({ ids, include });

    try {
      const { data } = await dataSources.eventAPI.getEventList(query);
      return data.map((event) => normalizeKeys(event));
    } catch (e) {
      Sentry.captureException(e);
      throw new Error(e);
    }
  },
};

export default { Query };
