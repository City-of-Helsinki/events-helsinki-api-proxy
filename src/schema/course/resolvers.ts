import { QueryResolvers } from '../../types/types';
import normalizeKeys from '../../utils/normalizeKeys';
import { buildCourseQuery, getCoursesList } from './utils';

const Query: QueryResolvers = {
  courseDetails: async (_, { id, include }, { dataSources }) => {
    const query = buildCourseQuery({ include });
    const data = await dataSources.courseAPI.getCourseDetails(id, query);

    return normalizeKeys(data);
  },

  courseList: async (_, params, { dataSources }) => {
    const query = buildCourseQuery(params);
    const data = await dataSources.courseAPI.getCourseList(query);

    return {
      data: data.data.map((course) => {
        return normalizeKeys(course);
      }),
      meta: data.meta,
    };
  },

  coursesByIds: async (_, { ids, include }, { dataSources }) => {
    return getCoursesList({ ids, include, dataSources });
  },
};

export default { Query };
