import { QueryResolvers } from '../../types/types';
import normalizeKeys from '../../utils/normalizeKeys';
import { CourseParams } from './types';
import { buildCourseQuery } from './utils';

const Query: QueryResolvers = {
  courseDetails: async (_, { id, include }, { dataSources }) => {
    const query = buildCourseQuery({ include });
    const data = await dataSources.courseAPI.getCourseDetails(id, query);

    return normalizeKeys(data);
  },

  courseList: async (_, params: CourseParams, { dataSources }) => {
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
    const courses = await Promise.all(
      ids.map(async (id) => {
        try {
          const query = buildCourseQuery({ include });
          const course = await dataSources.courseAPI.getCourseDetails(
            id,
            query
          );
          return normalizeKeys(course);
        } catch (e) {
          // TODO: Send error message to Sentry when implemented
          // eslint-disable-next-line no-console
          console.error('error', e);
          return null;
        }
      })
    );

    return courses.filter((e) => e);
  },
};

export default { Query };
