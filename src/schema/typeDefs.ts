import event from "./event/typeDefs";
import global from "./global/typeDefs";
import keyword from "./keyword/typeDefs";
import organization from "./organization/typeDefs";

const typeDefs = [...global, event, keyword, organization];

export default typeDefs;
