import normalizeKeys from "../../utils/normalizeKeys";

const mockCollection = {
  curatedEvents: [
    "http://localhost:3000/fi/event/helsinki:afxh3naida?id=123",
    "http://localhost:3000/fi/event/helsinki:afxrsql3xa",
    "http://localhost:3000/fi/event/helsinki:afxh3namhe",
    "http://localhost:3000/fi/event/helsinki:afxpj6bxbu",
    "http://localhost:3000/fi/event/helsinki:afx5msunhu"
  ],
  curatedEventsTitle: {
    en: "At least visit these",
    fi: "Käy ainakin näissä",
    sv: "Besök åtminstone dessa"
  },
  description: {
    en:
      // eslint-disable-next-line max-len
      "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.",
    fi:
      // eslint-disable-next-line max-len
      "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.",
    sv:
      // eslint-disable-next-line max-len
      "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus."
  },
  eventListQuery:
    "http://localhost:3000/en/events?categories=music&districts=kaupunginosa%3Aetu-t%C3%B6%C3%B6l%C3%B6",
  eventListTitle: {
    en: "All the best events of the fall",
    fi: "Kaikki syksyn parhaat tapahtumat",
    sv: "Höstens bästa händelser"
  },
  linkText: {
    en: "Read more on the project website",
    fi: "Lue lisää hankkeen omilta sivuilta",
    sv: "Läs mer på projektets webbplats"
  },
  linkUrl: {
    en: "http://www.google.com",
    fi: "http://www.google.com",
    sv: "http://www.google.com"
  },
  shortDescription: {
    en: "We put together the best foliage for the fall",
    fi: "Kokosimme parhaat tärpit syksylle",
    sv: "Vi sätter ihop det bästa bladverket för hösten"
  },
  similarCollectionsTitle: {
    en: "Check also these",
    fi: "Katso myös nämä",
    sv: "Se dessa också"
  },
  title: {
    en: "The most bustling tricks of the fall",
    fi: "Syksyn riehakkaimmat riennot",
    sv: "Höstens mest livliga knep"
  }
};

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
  collectionDetails: async (_, { id }, {}) => {
    // TODO: Get real collection data when API is ready
    return { ...mockCollection, id };
  },
  collectionList: async (_, {}, { dataSources }) => {
    const data = await dataSources.collectionAPI.getCollectionList();

    return {
      data: data.map(collection => normalizeCollection(collection))
    };
  }
};

export default { Query };
