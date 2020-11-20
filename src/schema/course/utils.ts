import { QueryCourseListArgs } from '../../types/types';
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
  ]);
};
