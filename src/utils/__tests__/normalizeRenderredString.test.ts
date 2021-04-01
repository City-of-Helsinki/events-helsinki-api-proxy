import normalizeRenderedString from '../normalizeRenderedString';

describe('normalizeRenderedString function', () => {
  it('should normalize rendered string object', () => {
    expect(
      normalizeRenderedString(
        {
          title: {
            rendered: 'Rendered string',
          },
        },
        'title'
      )
    ).toEqual({
      title: 'Rendered string',
    });
  });
});
