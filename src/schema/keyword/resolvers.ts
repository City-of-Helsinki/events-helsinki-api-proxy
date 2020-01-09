import normalizeKeys from "../../utils/normalizeKeys";

const keywordListQueryBuilder = (
  dataSource: string,
  page: number,
  pageSize: number,
  showAllKeywords: boolean,
  sort: string,
  text: string
) => {
  // Get details of all needed fields
  let query = "";

  if (dataSource) {
    query = query.concat(query ? "&data_source=" : "?data_source=", dataSource);
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
  if (showAllKeywords) {
    query = query.concat(
      query ? "&show_all_keywords=" : "?show_all_keywords=",
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
  keywordList: async (
    _,
    { dataSource, page, pageSize, showAllKeywords, sort, text },
    { dataSources }
  ) => {
    const query = keywordListQueryBuilder(
      dataSource,
      page,
      pageSize,
      showAllKeywords,
      sort,
      text
    );
    const data = await dataSources.keywordAPI.getKeywordList(query);

    return {
      data: data.data.map(keyword => {
        return normalizeKeys(keyword);
      }),
      meta: data.meta
    };
  }
};

export default { Query };
