import composeQuery from '../composeQuery';

describe('composeQuery function', () => {
  it('should compose new search query', () => {
    let query = '';

    query = composeQuery(query, 'param1', 'value1');
    expect(query).toBe('?param1=value1');

    query = composeQuery(query, 'param2', 'value2');
    expect(query).toBe('?param1=value1&param2=value2');
  });
});
