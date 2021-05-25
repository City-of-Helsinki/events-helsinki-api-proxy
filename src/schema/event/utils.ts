import { QueryEventListArgs } from '../../types/types';
import composeQuery from '../../utils/composeQuery';
import queryBuilder from '../../utils/queryBuilder';

export const buildEventListQuery = (params: QueryEventListArgs) => {
  return queryBuilder([
    { key: 'event_type', value: params.eventType },
    { key: 'combined_text', value: params.combinedText },
    { key: 'local_ongoing_AND', value: params.localOngoingAnd },
    { key: 'local_ongoing_OR', value: params.localOngoingOr },
    { key: 'local_ongoing_OR_set1', value: params.localOngoingOrSet1 },
    { key: 'local_ongoing_OR_set2', value: params.localOngoingOrSet2 },
    { key: 'local_ongoing_OR_set3', value: params.localOngoingOrSet3 },
    { key: 'internet_ongoing_AND', value: params.internetOngoingAnd },
    { key: 'internet_ongoing_OR', value: params.internetOngoingOr },
    { key: 'all_ongoing', value: params.allOngoing },
    { key: 'all_ongoing_AND', value: params.allOngoingAnd },
    { key: 'all_ongoing_OR', value: params.allOngoingOr },
    { key: 'division', value: params.division },
    { key: 'end', value: params.end },
    { key: 'ends_after', value: params.endsAfter },
    { key: 'ends_before', value: params.endsBefore },
    { key: 'include', value: params.include },
    { key: 'in_language', value: params.inLanguage },
    { key: 'is_free', value: params.isFree },
    { key: 'keyword', value: params.keyword },
    { key: 'keyword_AND', value: params.keywordAnd },
    { key: 'keyword_OR_set1', value: params.keywordOrSet1 },
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
    { key: 'ids', value: params.ids },
  ]);
};

export const buildEventDetailsQuery = (include?: string[]) => {
  let query = '';

  if (include && include.length) {
    query = composeQuery(query, 'include', include.join(','));
  }

  return query;
};
