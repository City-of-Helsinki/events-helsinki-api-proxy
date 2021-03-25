import * as Sentry from '@sentry/node';

import { LinkedEventsSource, QueryResolvers } from '../../types/types';
import normalizeKeys from '../../utils/normalizeKeys';
import { getCoursesList } from '../course/utils';
import { buildEventDetailsQuery, buildEventListQuery } from './utils';

const Query: QueryResolvers = {
  eventDetails: async (_, { id, include, source }, { dataSources }) => {
    const query = buildEventDetailsQuery(include);
    const data = await dataSources.eventAPI.getEventDetails(id, query, source);

    return normalizeKeys(data);
  },
  eventList: async (_, { source, ...params }, { dataSources }) => {
    const query = buildEventListQuery(params);
    const data = await dataSources.eventAPI.getEventList(query, source);

    return {
      data: data.data.map((event) => {
        return normalizeKeys(event);
      }),
      meta: data.meta,
    };
  },
  eventsByIds: async (_, { ids, include, source }, { dataSources }) => {
    // TEMPORARY HACK (linkedcourses doesn't suport new way of getting list of ids!!)
    if (source === LinkedEventsSource.Linkedcourses) {
      return getCoursesList({ ids, include, dataSources });
    }

    const query = buildEventListQuery({ ids, include });

    try {
      const { data } = await dataSources.eventAPI.getEventList(query, source);
      return data.map((event) => normalizeKeys(event));
    } catch (e) {
      Sentry.captureException(e);
      throw new Error(e);
    }
  },
};

export default { Query };
