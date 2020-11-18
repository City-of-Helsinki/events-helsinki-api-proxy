import { QueryResolvers } from '../../types/types';
import normalizeKeys from '../../utils/normalizeKeys';

const Query: QueryResolvers = {
  organizationDetails: async (_, { id, source }, { dataSources }) => {
    const data = await dataSources.organizationAPI.getOrganizationDetails(
      id,
      source
    );

    return normalizeKeys(data);
  },
};

export default { Query };
