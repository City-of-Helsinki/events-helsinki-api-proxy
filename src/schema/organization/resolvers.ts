import { QueryResolvers } from '../../types/types';
import normalizeKeys from '../../utils/normalizeKeys';

const Query: QueryResolvers = {
  organizationDetails: async (_, { id }, { dataSources }) => {
    const data = await dataSources.organizationAPI.getOrganizationDetails(id);

    return normalizeKeys(data);
  },
};

export default { Query };
