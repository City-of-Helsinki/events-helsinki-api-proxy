import { QueryResolvers } from '../../types/types';
import normalizeKeys from '../../utils/normalizeKeys';
import normalizeRenderedString from '../../utils/normalizeRenderedString';

const normalizeWpAccessibilityPage = (wpAccessibilityPage) => {
  let normalizedWpAccessibilityPage = normalizeKeys(wpAccessibilityPage);
  const renderedStringKeys = ['title', 'content'];

  renderedStringKeys.forEach((item) => {
    normalizedWpAccessibilityPage = normalizeRenderedString(
      normalizedWpAccessibilityPage,
      item
    );
  });

  return normalizedWpAccessibilityPage;
};

const Query: QueryResolvers = {
  wpAccessibilityPages: async (_, {}, { dataSources }) => {
    const data = await dataSources.wpAccessibilityPageAPI.getWpAccessibilityPages();

    return {
      data: data.map((page) => normalizeWpAccessibilityPage(page)),
    };
  },
};

export default { Query };
