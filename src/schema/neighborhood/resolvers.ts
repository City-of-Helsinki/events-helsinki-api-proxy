import capitalize from 'lodash/capitalize';

import { QueryResolvers } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const normalizeNeighborhood = (features: any[]) => {
  return features.map((feature) => ({
    id: `${feature.properties.aluejako.toLowerCase()}:${feature.properties.nimi_fi.toLowerCase()}`,
    name: {
      en: capitalize(feature.properties.nimi_fi),
      fi: capitalize(feature.properties.nimi_fi),
      sv: capitalize(feature.properties.nimi_se),
    },
  }));
};

const Query: QueryResolvers = {
  neighborhoodList: async (_, {}, { dataSources }) => {
    const data = await dataSources.neighborhoodAPI.getNeighborhoodList();

    return {
      data: normalizeNeighborhood(data.features),
      meta: {
        count: data.numberReturned,
        next: null,
        previous: null,
      },
    };
  },
};

export default { Query };
