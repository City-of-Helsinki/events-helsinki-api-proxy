import { QueryResolvers } from '../../types';
import normalizeKeys from '../../utils/normalizeKeys';
import normalizeLocalizedObject from '../../utils/normalizeLocalizedObject';

const Query: QueryResolvers = {
  aboutPages: async (_, {}, { dataSources }) => {
    const data = await dataSources.aboutPageAPI.getAboutPages();

    return {
      data: data.map((page) => normalizeAboutPage(page)),
    };
  },
};

const normalizeAboutPage = (aboutPage) => {
  let normalizedAboutPage = normalizeKeys(aboutPage);
  const normalizedKeys = ['headingSection', 'contentSection', 'keywords'];

  normalizedKeys.forEach((item) => {
    normalizedAboutPage = normalizeLocalizedObject(normalizedAboutPage, item);
  });

  return normalizedAboutPage;
};

export default { Query };
