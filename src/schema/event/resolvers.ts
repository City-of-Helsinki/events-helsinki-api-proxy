import Promise from "promise";

import normalizeKeys from "../../utils/normalizeKeys";

const composeQuery = (query: string, key: string, value: string) => {
  return query.concat(`${query ? "&" : "?"}${key}=`, value);
};

const eventDetailsQueryBuilder = (include: string[]) => {
  let query = "";

  if (include && include.length) {
    query = composeQuery(query, "include", include.join(","));
  }
  return query;
};

const eventListQueryBuilder = (
  divisions: string[],
  endDate: string,
  include: string[],
  inLanguage: string,
  isFree: boolean,
  keywords: string[],
  keywordNot: string[],
  language: string,
  locations: string[],
  page: number,
  pageSize: number,
  publisher: string,
  sort: string,
  startDate: string,
  superEvent: string,
  superEventType: string[],
  text: string,
  translation: string
) => {
  // Get details of all needed fields
  let query = "";

  if (include && include.length) {
    query = composeQuery(query, "include", include.join(","));
  }
  if (divisions && divisions.length) {
    query = composeQuery(query, "division", divisions.join(","));
  }
  if (endDate) {
    query = composeQuery(query, "end", endDate);
  }
  if (inLanguage) {
    query = composeQuery(query, "in_language", inLanguage);
  }
  if (isFree != null) {
    query = composeQuery(query, "is_free", isFree ? "true" : "false");
  }
  if (keywords && keywords.length) {
    query = composeQuery(query, "keyword", keywords.join(","));
  }
  if (keywordNot && keywordNot.length) {
    query = composeQuery(query, "keyword!", keywordNot.join(","));
  }
  if (language) {
    query = composeQuery(query, "language", language);
  }
  if (locations && locations.length) {
    query = composeQuery(query, "location", locations.join(","));
  }
  if (page) {
    query = composeQuery(query, "page", page.toString());
  }
  if (pageSize) {
    query = composeQuery(query, "page_size", pageSize.toString());
  }
  if (publisher) {
    query = composeQuery(query, "publisher", publisher);
  }
  if (sort) {
    query = composeQuery(query, "sort", sort);
  }
  if (startDate) {
    query = composeQuery(query, "start", startDate);
  }
  if (superEvent) {
    query = composeQuery(query, "super_event", superEvent);
  }
  if (superEventType && superEventType.length) {
    query = composeQuery(query, "super_event_type", superEventType.join(","));
  }
  if (text) {
    query = composeQuery(query, "text", text);
  }
  if (translation) {
    query = composeQuery(query, "translation", translation);
  }

  return query;
};

const Query = {
  eventDetails: async (_, { id, include }, { dataSources }) => {
    const query = eventDetailsQueryBuilder(include);
    const data = await dataSources.eventAPI.getEventDetails(id, query);

    return normalizeKeys(data);
  },

  eventList: async (
    _,
    {
      divisions,
      endDate,
      include,
      inLanguage,
      isFree,
      keywords,
      keywordNot,
      language,
      locations,
      page,
      pageSize,
      publisher,
      sort,
      startDate,
      superEvent,
      superEventType,
      text,
      translation
    },
    { dataSources }
  ) => {
    const query = eventListQueryBuilder(
      divisions,
      endDate,
      include,
      inLanguage,
      isFree,
      keywords,
      keywordNot,
      language,
      locations,
      page,
      pageSize,
      publisher,
      sort,
      startDate,
      superEvent,
      superEventType,
      text,
      translation
    );
    const data = await dataSources.eventAPI.getEventList(query);

    return {
      data: data.data.map(event => {
        return normalizeKeys(event);
      }),
      meta: data.meta
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
          console.error("error", e);
          return null;
        }
      })
    );

    return events.filter(e => e);
  }
};

export default { Query };
