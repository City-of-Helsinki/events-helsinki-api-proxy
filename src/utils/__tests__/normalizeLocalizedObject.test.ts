import normalizeLocalizedObject from '../normalizeLocalizedObject';

describe('normalizeLocalizedObject function', () => {
  it('should normalize certain localized object', () => {
    expect(
      normalizeLocalizedObject(
        {
          eventPrice: {
            isFree: false,
          },
          eventType: 'foo',
          nameEn: 'title en',
          nameFi: 'title fi',
          nameSv: 'title sv',
        },
        'name'
      )
    ).toEqual({
      eventPrice: { isFree: false },
      eventType: 'foo',
      name: {
        en: 'title en',
        fi: 'title fi',
        sv: 'title sv',
      },
    });
    expect(
      normalizeLocalizedObject(
        {
          eventPrice: {
            isFree: false,
          },
          eventType: 'foo',
          imageEn: {
            name: 'title en',
            url: 'www.test.en',
          },
          imageFi: {
            name: 'title fi',
            url: 'www.test.fi',
          },
          imageSv: {
            name: 'title sv',
            url: 'www.test.sv',
          },
        },
        'image'
      )
    ).toEqual({
      eventPrice: { isFree: false },
      eventType: 'foo',
      image: {
        en: {
          name: 'title en',
          url: 'www.test.en',
        },
        fi: {
          name: 'title fi',
          url: 'www.test.fi',
        },
        sv: {
          name: 'title sv',
          url: 'www.test.sv',
        },
      },
    });
  });
});
