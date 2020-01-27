const mockCollection = {
  curatedEvents: [
    "http://localhost:3000/fi/event/helsinki:afxh3naida?id=123",
    "http://localhost:3000/fi/event/helsinki:afxrsql3xa",
    "http://localhost:3000/fi/event/helsinki:afxh3namhe",
    "http://localhost:3000/fi/event/helsinki:afxpj6bxbu",
    "http://localhost:3000/fi/event/helsinki:afx5msunhu"
  ],
  eventListQuery:
    "http://localhost:3000/en/events?categories=music&districts=kaupunginosa%3Aetu-t%C3%B6%C3%B6l%C3%B6",
  eventListTitle: {
    en: "All the best events of the fall",
    fi: "Kaikki syksyn parhaat tapahtumat",
    sv: "Höstens bästa händelser"
  }
};

const Query = {
  collectionDetails: async (_, { id }, {}) => {
    return { ...mockCollection, id };
  }
};

export default { Query };
