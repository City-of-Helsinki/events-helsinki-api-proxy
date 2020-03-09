import normalizeKeys from "../../utils/normalizeKeys";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const normalizeCollection = (collection: any) => {
  const normalizedCollection = normalizeKeys(collection);

  normalizedCollection.title = {
    en: normalizedCollection.titleEn,
    fi: normalizedCollection.titleFi,
    sv: normalizedCollection.titleSv
  };
  delete normalizedCollection.titleEn;
  delete normalizedCollection.titleFi;
  delete normalizedCollection.titleSv;

  normalizedCollection.description = {
    en: normalizedCollection.descriptionEn,
    fi: normalizedCollection.descriptionFi,
    sv: normalizedCollection.descriptionSv
  };
  delete normalizedCollection.descriptionEn;
  delete normalizedCollection.descriptionFi;
  delete normalizedCollection.descriptionSv;

  normalizedCollection.shortDescription = {
    en: normalizedCollection.shortDescriptionEn,
    fi: normalizedCollection.shortDescriptionFi,
    sv: normalizedCollection.shortDescriptionSv
  };
  delete normalizedCollection.shortDescriptionEn;
  delete normalizedCollection.shortDescriptionFi;
  delete normalizedCollection.shortDescriptionSv;

  normalizedCollection.linkText = {
    en: normalizedCollection.linkTextEn,
    fi: normalizedCollection.linkTextFi,
    sv: normalizedCollection.linkTextSv
  };
  delete normalizedCollection.linkTextEn;
  delete normalizedCollection.linkTextFi;
  delete normalizedCollection.linkTextSv;

  normalizedCollection.linkUrl = {
    en: normalizedCollection.linkUrlEn,
    fi: normalizedCollection.linkUrlFi,
    sv: normalizedCollection.linkUrlSv
  };
  delete normalizedCollection.linkUrlEn;
  delete normalizedCollection.linkUrlFi;
  delete normalizedCollection.linkUrlSv;

  normalizedCollection.curatedEventsTitle = {
    en: normalizedCollection.curatedEventsTitleEn,
    fi: normalizedCollection.curatedEventsTitleFi,
    sv: normalizedCollection.curatedEventsTitleSv
  };
  delete normalizedCollection.curatedEventsTitleEn;
  delete normalizedCollection.curatedEventsTitleFi;
  delete normalizedCollection.curatedEventsTitleSv;

  normalizedCollection.eventListTitle = {
    en: normalizedCollection.eventListTitleEn,
    fi: normalizedCollection.eventListTitleFi,
    sv: normalizedCollection.eventListTitleSv
  };
  delete normalizedCollection.eventListTitleEn;
  delete normalizedCollection.eventListTitleFi;
  delete normalizedCollection.eventListTitleSv;

  return normalizedCollection;
};

const Query = {
  collectionDetails: async (_, { id }, { dataSources }) => {
    const data = await dataSources.collectionAPI.getCollectionDetails(id);

    return normalizeCollection(data);
  },
  collectionList: async (_, {}, { dataSources }) => {
    const data = await dataSources.collectionAPI.getCollectionList();

    return {
      data: data.map(collection => normalizeCollection(collection))
    };
  }
};

export default { Query };
