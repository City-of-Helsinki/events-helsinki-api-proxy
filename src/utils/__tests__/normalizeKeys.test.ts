import normalizeKeys from '../normalizeKeys';

describe('normalizeKeys function', () => {
  it('should normalize entered object', () => {
    expect(
      normalizeKeys({
        '@id': '123',
        event_price: {
          is_free: false,
        },
        event_type: ['foo', 'bar'],
      })
    ).toEqual({
      eventPrice: { isFree: false },
      eventType: ['foo', 'bar'],
      internalId: '123',
    });
  });
});
