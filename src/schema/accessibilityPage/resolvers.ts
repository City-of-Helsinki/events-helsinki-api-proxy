import normalizeKeys from '../../utils/normalizeKeys';
import normalizeLocalizedObject from '../../utils/normalizeLocalizedObject';

const normalizeAccessibilityPage = collection => {
  let normalizedCollection = normalizeKeys(collection);
  const normalizedKeys = ['headingSection', 'contentSection'];

  normalizedKeys.forEach(item => {
    normalizedCollection = normalizeLocalizedObject(normalizedCollection, item);
  });

  return normalizedCollection;
};

const Query = {
  accessibilityPages: async (_, {}, { dataSources }) => {
    const data = await dataSources.accessibilityPageAPI.getAccessibilityPages();

    return {
      data: data.map(page => normalizeAccessibilityPage(page)),
    };
  },
};

export default { Query };
