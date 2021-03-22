import * as Sentry from '@sentry/node';

import { QueryCourseListArgs } from '../../types/types';
import normalizeKeys from '../../utils/normalizeKeys';
import queryBuilder from '../../utils/queryBuilder';

export const buildCourseQuery = (params: QueryCourseListArgs) => {
  return queryBuilder([
    { key: 'combined_text', value: params.combinedText },
    { key: 'division', value: params.division },
    { key: 'end', value: params.end },
    { key: 'ends_after', value: params.endsAfter },
    { key: 'ends_before', value: params.endsBefore },
    { key: 'include', value: params.include },
    { key: 'in_language', value: params.inLanguage },
    { key: 'is_free', value: params.isFree },
    { key: 'keyword', value: params.keyword },
    { key: 'keyword_AND', value: params.keywordAnd },
    { key: 'keyword_OR_set2', value: params.keywordOrSet2 },
    { key: 'keyword_OR_set3', value: params.keywordOrSet3 },
    { key: 'keyword!', value: params.keywordNot },
    { key: 'language', value: params.language },
    { key: 'location', value: params.location },
    { key: 'page', value: params.page },
    { key: 'page_size', value: params.pageSize },
    { key: 'publisher', value: params.publisher },
    { key: 'sort', value: params.sort },
    { key: 'start', value: params.start },
    { key: 'starts_after', value: params.startsAfter },
    { key: 'starts_before', value: params.startsBefore },
    { key: 'super_event', value: params.superEvent },
    { key: 'super_event_type', value: params.superEventType },
    { key: 'text', value: params.text },
    { key: 'translation', value: params.translation },
    { key: 'audience_min_age_lt', value: params.audienceMinAgeLt },
    { key: 'audience_min_age_gt', value: params.audienceMinAgeGt },
    { key: 'audience_max_age_lt', value: params.audienceMaxAgeLt },
    { key: 'audience_max_age_gt', value: params.audienceMaxAgeGt },
  ]);
};

export const getCoursesList = async ({
  dataSources,
  include,
  ids,
}: {
  dataSources: any;
  include: string[];
  ids: string[];
}) => {
  const courses = await Promise.all(
    ids.map(async (id) => {
      try {
        const query = buildCourseQuery({ include });
        const course = await dataSources.courseAPI.getCourseDetails(id, query);
        return normalizeKeys(course);
      } catch (e) {
        Sentry.captureException(e);
        // eslint-disable-next-line no-console
        console.error('error', e);
        return null;
      }
    })
  );

  return courses.filter(Boolean);
};
