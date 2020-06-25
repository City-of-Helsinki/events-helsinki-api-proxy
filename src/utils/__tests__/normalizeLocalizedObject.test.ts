import normalizeLocalizedObject from "../normalizeLocalizedObject";

describe("normalizeLocalizedObject function", () => {
  it("should normalize certain localized object", () => {
    expect(
      normalizeLocalizedObject(
        {
          eventPrice: {
            isFree: false
          },
          eventType: "foo",
          nameEn: "title en",
          nameFi: "title fi",
          nameSv: "title sv"
        },
        "name"
      )
    ).toEqual({
      eventPrice: { isFree: false },
      eventType: "foo",
      name: {
        en: "title en",
        fi: "title fi",
        sv: "title sv"
      }
    });
  });
});
