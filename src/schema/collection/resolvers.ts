import composeQuery from "../../utils/composeQuery";
import normalizeKeys from "../../utils/normalizeKeys";
import normalizeLocalizedObject from "../../utils/normalizeLocalizedObject";

const normalizeCollection = collection => {
  let normalizedCollection = normalizeKeys(collection);
  const normalizedKeys = [
    { key: "title", normalizedKey: "title" },
    { key: "subtitles", normalizedKey: "subtitles" },
    { key: "description", normalizedKey: "description" },
    { key: "linkText", normalizedKey: "linkText" },
    { key: "linkUrl", normalizedKey: "linkUrl" },
    { key: "socialMediaDescription", normalizedKey: "socialMediaDescription" },
    { key: "curatedEventsTitle", normalizedKey: "curatedEventsTitle" },
    { key: "eventListTitle", normalizedKey: "eventListTitle" }
  ];

  normalizedKeys.forEach(item => {
    normalizedCollection = normalizeLocalizedObject(
      normalizedCollection,
      item.key,
      item.normalizedKey
    );
  });

  return normalizedCollection;
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
  collectionDetails: async (_, { id }, { dataSources }) => {
    const data = await dataSources.collectionAPI.getCollectionDetails(id);

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
