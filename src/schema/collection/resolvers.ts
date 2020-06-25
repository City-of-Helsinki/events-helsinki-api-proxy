import composeQuery from "../../utils/composeQuery";
import normalizeKeys from "../../utils/normalizeKeys";
import normalizeLocalizedObject from "../../utils/normalizeLocalizedObject";

const normalizeCollection = collection => {
  let normalizedCollection = normalizeKeys(collection);
  const normalizedKeys = [
    "title",
    "description",
    "linkText",
    "linkUrl",
    "socialMediaDescription",
    "curatedEventsTitle",
    "eventListTitle"
  ];

  normalizedKeys.forEach(item => {
    normalizedCollection = normalizeLocalizedObject(normalizedCollection, item);
  });

  return normalizedCollection;
};

const collectionQueryBuilder = (draft: boolean) => {
  let query = "";

  if (draft != null) {
    query = composeQuery(query, "draft", draft ? "true" : "false");
  }

  return query;
};

const collectionListQueryBuilder = (visibleOnFrontpage: boolean) => {
  let query = "";

  if (visibleOnFrontpage != null) {
    query = composeQuery(
      query,
      "visible_on_frontpage",
      visibleOnFrontpage ? "true" : "false"
    );
  }

  return query;
};

const Query = {
  collectionDetails: async (_, { draft, id }, { dataSources }) => {
    const data = await dataSources.collectionAPI.getCollectionDetails(
      id,
      collectionQueryBuilder(draft)
    );

    return normalizeCollection(data);
  },
  collectionList: async (_, { visibleOnFrontpage }, { dataSources }) => {
    const data = await dataSources.collectionAPI.getCollectionList(
      collectionListQueryBuilder(visibleOnFrontpage)
    );

    return {
      data: data.map(collection => normalizeCollection(collection))
    };
  }
};

export default { Query };
