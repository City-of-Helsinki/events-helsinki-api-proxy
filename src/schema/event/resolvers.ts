import Sentry from '@sentry/node';

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
    const events = await Promise.all(
      ids.map(async (id) => {
        try {
          const query = buildEventDetailsQuery(include);
          const event = await dataSources.eventAPI.getEventDetails(id, query);
          return normalizeKeys(event);
        } catch (e) {
          Sentry.captureException(e);
          // eslint-disable-next-line no-console
          console.error('error', e);
          return null;
        }
      })
    );

    return events.filter((e) => e);
  },
};

export default { Query };
