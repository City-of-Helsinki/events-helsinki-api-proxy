/**
 * Normalize nested rendered string field from WP to normal String field
 * Before:
 * {
 *    title: {
        rendered: "String content"
     }
 * }
 * After
 * {
 *    title: "String content"
 * }
 */
export default <T>(data: T, key: string): T => {
  const normalizedData = { ...data };
  normalizedData[key] = normalizedData[key]['rendered'];
  delete normalizedData[key]['rendered'];

  return normalizedData;
};
