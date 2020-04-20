import composeQuery from "../../utils/composeQuery";
import normalizeKeys from "../../utils/normalizeKeys";
import normalizeLocalizedObject from "../../utils/normalizeLocalizedObject";

const normalizeLandingPage = collection => {
  let normalizedLandingPage = normalizeKeys(collection);
  const normalizedKeys = [
    { key: "title", normalizedKey: "title" },
    { key: "description", normalizedKey: "description" },
    { key: "buttonText", normalizedKey: "buttonText" },
    { key: "buttonUrl", normalizedKey: "buttonUrl" },
    { key: "metaInformation", normalizedKey: "metaInformation" },
    { key: "pageTitle", normalizedKey: "pageTitle" }
  ];

  normalizedKeys.forEach(item => {
    normalizedLandingPage = normalizeLocalizedObject(
      normalizedLandingPage,
      item.key,
      item.normalizedKey
    );
  });

  return normalizedLandingPage;
};

const landingPageQueryBuilder = (visibleOnFrontpage: boolean) => {
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
  landingPage: async (_, { visibleOnFrontpage }, { dataSources }) => {
    const data = await dataSources.landingPageAPI.getLandingPage(
      landingPageQueryBuilder(visibleOnFrontpage)
    );

    return { data: data.map(item => normalizeLandingPage(item)) };
  }
};

export default { Query };
