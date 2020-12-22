import { QueryResolvers } from '../../types/types';
import composeQuery from '../../utils/composeQuery';
import normalizeKeys from '../../utils/normalizeKeys';
import normalizeLocalizedObject from '../../utils/normalizeLocalizedObject';

const normalizeLandingPage = (collection) => {
  let normalizedLandingPage = normalizeKeys(collection);
  const normalizedKeys = [
    'title',

    // BEGIN deprecated fields
    'description',
    'socialMediaImage',
    'titleAndDescriptionColor',
    'buttonText',
    'buttonUrl',
    'heroBackgroundImage',
    'heroBackgroundImageMobile',
    'heroBackgroundImageColor',
    'heroTopLayerImage',
    // END deprecated fields

    'keywords',
    'metaInformation',
    'pageTitle',
  ];

  normalizedKeys.forEach((item) => {
      normalizedLandingPage = normalizeLocalizedObject(
        normalizedLandingPage,
        item
      );
  });
  return normalizedLandingPage;
};

const landingPageQueryBuilder = (draft: boolean) => {
  let query = '';

  if (draft != null) {
    query = composeQuery(query, 'draft', draft ? 'true' : 'false');
  }

  return query;
};
const landingPagesQueryBuilder = (visibleOnFrontpage: boolean) => {
  let query = '';

  if (visibleOnFrontpage != null) {
    query = composeQuery(
      query,
      'visible_on_frontpage',
      visibleOnFrontpage ? 'true' : 'false'
    );
  }

  return query;
};

const Query: QueryResolvers = {
  landingPage: async (_, { draft, id }, { dataSources }) => {
    const data = await dataSources.landingPageAPI.getLandingPage(
      id,
      landingPageQueryBuilder(draft)
    );

    return normalizeLandingPage(data);
  },
  landingPages: async (_, { visibleOnFrontpage }, { dataSources }) => {
    const data = await dataSources.landingPageAPI.getLandingPages(
      landingPagesQueryBuilder(visibleOnFrontpage)
    );

    return { data: data.map((item) => normalizeLandingPage(item)) };
  },
};

export default { Query };
