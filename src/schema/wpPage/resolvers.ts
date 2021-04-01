import { QueryResolvers } from '../../types/types';
import composeQuery from '../../utils/composeQuery';
import normalizeKeys from '../../utils/normalizeKeys';
import normalizeRenderedString from '../../utils/normalizeRenderedString';

const normalizeWpPage = (wpPage) => {
  let normalizedWpAccessibilityPage = normalizeKeys(wpPage);
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
  wpPages: async (_, { slug }, { dataSources }) => {
    const data = await dataSources.wpPageAPI.getWpPages(slug);

    return {
      data: data.map((page) => normalizeWpPage(page)),
    };
  },
  // wpAccessibilityPages: async (_, {}, { dataSources }) => {
  //   const data = await dataSources.wpPageAPI.getWpPages();

  //   return {
  //     data: data.map((page) => normalizeWpPage(page)),
  //   };
  // },
};

export default { Query };
