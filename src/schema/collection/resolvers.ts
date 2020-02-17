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
  link: {
    text: {
      en: "Read more on the project website",
      fi: "Lue lisää hankkeen omilta sivuilta",
      sv: "Läs mer på projektets webbplats"
    },
    url: {
      en: "http://www.google.com",
      fi: "http://www.google.com",
      sv: "http://www.google.com"
    }
  },
  shortDescription: {
    en: "We put together the best foliage for the fall",
    fi: "Kokosimme parhaat tärpit syksylle",
    sv: "Vi sätter ihop det bästa bladverket för hösten"
  },
  title: {
    en: "The most bustling tricks of the fall",
    fi: "Syksyn riehakkaimmat riennot",
    sv: "Höstens mest livliga knep"
  }
};

const Query = {
  collectionDetails: async (_, { id }, {}) => {
    // TODO: Get real collection data when API is ready
    return { ...mockCollection, id };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  collectionList: async (_, {}, {}) => {
    // TODO: Get real collection data when API is ready
    const collectionIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return {
      data: collectionIds.map(id => ({ ...mockCollection, id })),
      meta: {
        count: collectionIds.length,
        next: null,
        previous: null
      }
    };
  }
};

export default { Query };
