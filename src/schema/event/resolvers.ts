import Promise from 'promise';

import composeQuery from '../../utils/composeQuery';
import normalizeKeys from '../../utils/normalizeKeys';
import { EventParams } from './types';

const eventDetailsQueryBuilder = (include: string[]) => {
  let query = '';

  if (include && include.length) {
    query = composeQuery(query, 'include', include.join(','));
  }
  return query;
};

const eventListQueryBuilder = ({
  combinedText,
  division,
  end,
  endsAfter,
  endsBefore,
  inLanguage,
  include,
  isFree,
  keywordAnd,
  keywordNot,
  keyword,
  language,
  location,
  page,
  pageSize,
  publisher,
  sort,
  start,
  startsAfter,
  startsBefore,
  superEvent,
  superEventType,
  text,
  translation,
}: EventParams) => {
  // Get details of all needed fields
  let query = '';

  if (combinedText && combinedText.length) {
    query = composeQuery(query, 'combined_text', combinedText.join(','));
  }
  if (division && division.length) {
    query = composeQuery(query, 'division', division.join(','));
  }
  if (end) {
    query = composeQuery(query, 'end', end);
  }
  if (endsAfter) {
    query = composeQuery(query, 'ends_after', endsAfter);
  }
  if (endsBefore) {
    query = composeQuery(query, 'ends_before', endsBefore);
  }
  if (inLanguage) {
    query = composeQuery(query, 'in_language', inLanguage);
  }
  if (include && include.length) {
    query = composeQuery(query, 'include', include.join(','));
  }
  if (isFree != null) {
    query = composeQuery(query, 'is_free', isFree ? 'true' : 'false');
  }
  if (keyword && keyword.length) {
    query = composeQuery(query, 'keyword', keyword.join(','));
  }
  if (keywordAnd && keywordAnd.length) {
    query = composeQuery(query, 'keyword_AND', keywordAnd.join(','));
  }
  if (keywordNot && keywordNot.length) {
    query = composeQuery(query, 'keyword!', keywordNot.join(','));
  }
  if (language) {
    query = composeQuery(query, 'language', language);
  }
  if (location && location.length) {
    query = composeQuery(query, 'location', location.join(','));
  }
  if (page) {
    query = composeQuery(query, 'page', page.toString());
  }
  if (pageSize) {
    query = composeQuery(query, 'page_size', pageSize.toString());
  }
  if (publisher) {
    query = composeQuery(query, 'publisher', publisher);
  }
  if (sort) {
    query = composeQuery(query, 'sort', sort);
  }
  if (start) {
    query = composeQuery(query, 'start', start);
  }
  if (startsAfter) {
    query = composeQuery(query, 'starts_after', startsAfter);
  }
  if (startsBefore) {
    query = composeQuery(query, 'starts_before', startsBefore);
  }
  if (superEvent) {
    query = composeQuery(query, 'super_event', superEvent);
  }
  if (superEventType && superEventType.length) {
    query = composeQuery(query, 'super_event_type', superEventType.join(','));
  }
  if (text) {
    query = composeQuery(query, 'text', text);
  }
  if (translation) {
    query = composeQuery(query, 'translation', translation);
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
    const query = eventListQueryBuilder(params);
    const data = await dataSources.eventAPI.getEventList(query);

    return {
      data: data.data.map(event => {
        return normalizeKeys(event);
      }),
      meta: data.meta,
    };
  },

  eventsByIds: async (_, { ids, include }, { dataSources }) => {
    const events = await Promise.all(
      ids.map(async id => {
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

    return events.filter(e => e);
  },
};

export default { Query };
