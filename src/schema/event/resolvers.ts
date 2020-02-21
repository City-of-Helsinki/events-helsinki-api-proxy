import normalizeKeys from "../../utils/normalizeKeys";

const eventDetailsQueryBuilder = () => {
  // Get details of all needed fields
  return "?include=in_language,keywords,location";
};

const composeQuery = (query: string, key: string, value: string) => {
  return query.concat(`${query ? "&" : "?"}${key}=`, value);
};

const eventListQueryBuilder = (
  divisions: string[],
  endDate: string,
  include: string[],
  inLanguage: string,
  keywords: string[],
  language: string,
  locations: string[],
  page: number,
  pageSize: number,
  publisher: string,
  sort: string,
  startDate: string,
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
  if (keywords && keywords.length) {
    query = composeQuery(query, "keyword", keywords.join(","));
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
  if (text) {
    query = composeQuery(query, "text", text);
  }
  if (translation) {
    query = composeQuery(query, "translation", translation);
  }

  return query;
};

const Query = {
  eventDetails: async (_, { id }, { dataSources }) => {
    const query = eventDetailsQueryBuilder();
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
      keywords,
      language,
      locations,
      page,
      pageSize,
      publisher,
      sort,
      startDate,
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
      keywords,
      language,
      locations,
      page,
      pageSize,
      publisher,
      sort,
      startDate,
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
  }
};

export default { Query };
