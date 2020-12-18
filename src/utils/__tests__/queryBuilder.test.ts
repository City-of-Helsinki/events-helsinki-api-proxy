/* eslint-disable max-len */
import queryBuilder from '../queryBuilder';

describe('queryBuilder function', () => {
  it('returns correct query string with arrays', () => {
    const query = queryBuilder([
      { key: 'combined_text', value: ['hakusana1', 'hakusana2'] },
      { key: 'division', value: ['division1', 'division2'] },
    ]);

    expect(query).toEqual(
      '?combined_text=hakusana1,hakusana2&division=division1,division2'
    );
  });

  it('returns correct query string with booleans', () => {
    const query = queryBuilder([
      { key: 'isFree', value: true },
      { key: 'otherBoolean', value: false },
    ]);

    expect(query).toEqual('?isFree=true&otherBoolean=false');
  });

  it('returns correct query string with strings', () => {
    const query = queryBuilder([
      { key: 'sort', value: 'name' },
      { key: 'start', value: '12-12-12' },
    ]);

    expect(query).toEqual('?sort=name&start=12-12-12');
  });

  it('returns correct query string with numbers', () => {
    const query = queryBuilder([
      { key: 'page', value: 0 },
      { key: 'page_size', value: 1 },
      { key: 'count', value: 10 },
    ]);

    expect(query).toEqual('?page=0&page_size=1&count=10');
  });

  it('returns correct query from mixed types', () => {
    expect(
      queryBuilder([
        { key: 'page', value: 0 },
        { key: 'page_size', value: 1 },
        { key: 'count', value: 10 },
        { key: 'sort', value: 'name' },
        { key: 'start', value: '12-12-12' },
        { key: 'isFree', value: true },
        { key: 'otherBoolean', value: false },
        { key: 'combined_text', value: ['hakusana1', 'hakusana2'] },
        { key: 'division', value: ['division1', 'division2'] },
      ])
    ).toEqual(
      '?page=0&page_size=1&count=10&sort=name&start=12-12-12&isFree=true&otherBoolean=false&combined_text=hakusana1,hakusana2&division=division1,division2'
    );
  });
});
