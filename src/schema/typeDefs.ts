import aboutPage from './aboutPage/typeDefs';
import accessibilityPage from './accessibilityPage/typeDefs';
import collection from './collection/typeDefs';
import course from './course/typeDefs';
import event from './event/typeDefs';
import globalDefs from './global/typeDefs';
import keyword from './keyword/typeDefs';
import landingPage from './landingPage/typeDefs';
import neighborhood from './neighborhood/typeDefs';
import organization from './organization/typeDefs';
import place from './place/typeDefs';
import wpAccessibilityPage from './wpAccessibilityPage/typeDefs';

const typeDefs = [
  ...globalDefs,
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
  place,
];

export default typeDefs;
