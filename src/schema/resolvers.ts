import merge from 'lodash/merge';

import aboutPage from './aboutPage/resolvers';
import accessibilityPage from './accessibilityPage/resolvers';
import collection from './collection/resolvers';
import course from './course/resolvers';
import event from './event/resolvers';
import keyword from './keyword/resolvers';
import landingPage from './landingPage/resolvers';
import neighborhood from './neighborhood/resolvers';
import organization from './organization/resolvers';
import place from './place/resolvers';
import wpAccessibilityPage from './wpAccessibilityPage/resolvers';

const resolvers = merge(
  aboutPage,
  accessibilityPage,
  wpAccessibilityPage,
  collection,
  event,
  course,
  keyword,
  landingPage,
  neighborhood,
  organization,
  place
);

export default resolvers;
