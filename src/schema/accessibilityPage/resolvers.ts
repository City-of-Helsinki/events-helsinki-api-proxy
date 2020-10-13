import normalizeKeys from '../../utils/normalizeKeys';
import normalizeLocalizedObject from '../../utils/normalizeLocalizedObject';

const normalizeAccessibilityPage = accessibilityPage => {
  let normalizedAccessibilityPage = normalizeKeys(accessibilityPage);
  const normalizedKeys = ['headingSection', 'contentSection'];

  normalizedKeys.forEach(item => {
    normalizedAccessibilityPage = normalizeLocalizedObject(
      normalizedAccessibilityPage,
      item
    );
  });

  return normalizedAccessibilityPage;
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