import normalizeKeys from "../../utils/normalizeKeys";
import normalizeLocalizedObject from "../../utils/normalizeLocalizedObject";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const normalizeCollection = (collection: any) => {
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

const Query = {
  collectionDetails: async (_, { id }, { dataSources }) => {
    const data = await dataSources.collectionAPI.getCollectionDetails(id);

    return normalizeCollection(data);
  },
  collectionList: async (_, {}, { dataSources }) => {
    const data = await dataSources.collectionAPI.getCollectionList();

    return {
      data: data.map(collection => normalizeCollection(collection))
    };
  }
};

export default { Query };
