import composeQuery from '../../utils/composeQuery';
import normalizeKeys from '../../utils/normalizeKeys';
import { EventParams } from './types';
import { buildEventQuery } from './utils';

const eventDetailsQueryBuilder = (include: string[]) => {
  let query = '';

  if (include && include.length) {
    query = composeQuery(query, 'include', include.join(','));
  }
  return query;
};

const Query = {
  eventDetails: async (_, { id, include }, { dataSources }) => {
    const query = eventDetailsQueryBuilder(include);
    const data = await dataSources.eventAPI.getEventDetails(id, query);

    return normalizeKeys(data);
  },

  eventList: async (_, params: EventParams, { dataSources }) => {
    const query = buildEventQuery(params);
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
          const query = eventDetailsQueryBuilder(include);
          const event = await dataSources.eventAPI.getEventDetails(id, query);
          return normalizeKeys(event);
        } catch (e) {
          // TODO: Send error message to Sentry when implemented
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
