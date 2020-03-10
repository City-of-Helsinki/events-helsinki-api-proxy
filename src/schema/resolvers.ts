import merge from "lodash/merge";

import collection from "./collection/resolvers";
import event from "./event/resolvers";
import keyword from "./keyword/resolvers";
import organization from "./organization/resolvers";
import place from "./place/resolvers";

const resolvers = merge(collection, event, keyword, organization, place);

export default resolvers;
