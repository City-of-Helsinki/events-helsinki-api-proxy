/**
 * Add new parameter to query search query and get new query
 * @param {string} query
 * @param {string} key
 * @param {string} value
 * @return {string}
 */
export default (query: string, key: string, value: string) => {
  const delimiter = query ? '&' : '?';
  return `${query}${delimiter}${key}=${value}`;
};
