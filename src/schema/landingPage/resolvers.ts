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

const Query = {
  landingPage: async (_, {}, { dataSources }) => {
    const data = await dataSources.landingPageAPI.getLandingPage();

    return normalizeLandingPage(data[0]);
  }
};

export default { Query };
