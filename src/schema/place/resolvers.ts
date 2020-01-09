import normalizeKeys from "../../utils/normalizeKeys";

const placeListQueryBuilder = (
  dataSource: string,
  divisions: string[],
  page: number,
  pageSize: number,
  showAllPlaces: boolean,
  sort: string,
  text: string
) => {
  // Get details of all needed fields
  let query = "";

  if (dataSource) {
    query = query.concat(query ? "&data_source=" : "?data_source=", dataSource);
  }
  if (divisions && divisions.length) {
    query = query.concat(
      query ? "&division=" : "?division=",
      divisions.join(",")
    );
  }
  if (page) {
    query = query.concat(query ? "&page=" : "?page=", page.toString());
  }
  if (pageSize) {
    query = query.concat(
      query ? "&page_size=" : "?page_size=",
      pageSize.toString()
    );
  }
  if (showAllPlaces) {
    query = query.concat(
      query ? "&show_all_places=" : "?show_all_places=",
      "true"
    );
  }
  if (sort) {
    query = query.concat(query ? "&sort=" : "?sort=", sort);
  }
  if (text) {
    query = query.concat(query ? "&text=" : "?text=", text);
  }

  return query;
};

const Query = {
  placeList: async (
    _,
    { dataSource, divisions, page, pageSize, showAllPlaces, sort, text },
    { dataSources }
  ) => {
    const query = placeListQueryBuilder(
      dataSource,
      divisions,
      page,
      pageSize,
      showAllPlaces,
      sort,
      text
    );
    const data = await dataSources.placeAPI.getPlaceList(query);

    return {
      data: data.data.map(place => {
        return normalizeKeys(place);
      }),
      meta: data.meta
    };
  }
};

export default { Query };
