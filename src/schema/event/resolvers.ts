import normalizeKeys from "../../utils/normalizeKeys";

const eventDetailsQueryBuilder = () => {
  // Get details of all needed fields
  return "?include=in_language,keywords,location";
};

const eventListQueryBuilder = (
  divisions: string[],
  endDate: string,
  keywords: string[],
  locations: string[],
  page: number,
  pageSize: number,
  publisher: string,
  sort: string,
  startDate: string,
  text: string
) => {
  // Get details of all needed fields
  let query = "?include=keywords,location";

  if (divisions && divisions.length) {
    query = query.concat("&division=", divisions.join(","));
  }
  if (endDate) {
    query = query.concat("&end=", endDate);
  }
  if (keywords && keywords.length) {
    query = query.concat("&keyword=", keywords.join(","));
  }
  if (locations && locations.length) {
    query = query.concat("&location=", locations.join(","));
  }
  if (page) {
    query = query.concat("&page=", page.toString());
  }
  if (pageSize) {
    query = query.concat("&page_size=", pageSize.toString());
  }
  if (publisher) {
    query = query.concat("&publisher=", publisher);
  }
  if (sort) {
    query = query.concat("&sort=", sort);
  }
  if (startDate) {
    query = query.concat("&start=", startDate);
  }
  if (text) {
    query = query.concat("&text=", text);
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
      keywords,
      locations,
      page,
      pageSize,
      publisher,
      sort,
      startDate,
      text
    },
    { dataSources }
  ) => {
    const query = eventListQueryBuilder(
      divisions,
      endDate,
      keywords,
      locations,
      page,
      pageSize,
      publisher,
      sort,
      startDate,
      text
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
