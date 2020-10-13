import normalizeKeys from '../../utils/normalizeKeys';
import normalizeLocalizedObject from '../../utils/normalizeLocalizedObject';

const normalizeAboutPage = aboutPage => {
  let normalizedAboutPage = normalizeKeys(aboutPage);
  const normalizedKeys = ['headingSection', 'contentSection'];

  normalizedKeys.forEach(item => {
    normalizedAboutPage = normalizeLocalizedObject(normalizedAboutPage, item);
  });

  return normalizedAboutPage;
};

const Query = {
  aboutPages: async (_, {}, { dataSources }) => {
    const data = await dataSources.aboutPageAPI.getAboutPages();

    return {
      data: data.map(page => normalizeAboutPage(page)),
    };
  },
};

export default { Query };