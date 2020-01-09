import merge from "lodash/merge";

import event from "./event/resolvers";
import keyword from "./keyword/resolvers";
import organization from "./organization/resolvers";

const resolvers = merge(event, keyword, organization);

export default resolvers;
