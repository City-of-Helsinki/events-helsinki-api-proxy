import collection from "./collection/typeDefs";
import event from "./event/typeDefs";
import global from "./global/typeDefs";
import keyword from "./keyword/typeDefs";
import landingPage from "./landingPage/typeDefs";
import organization from "./organization/typeDefs";
import place from "./place/typeDefs";

const typeDefs = [
  ...global,
  collection,
  event,
  keyword,
  landingPage,
  organization,
  place
];

export default typeDefs;
