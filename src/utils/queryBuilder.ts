import composeQuery from './composeQuery';

interface VariableToKeyItem {
  key: string;
  value: string[] | string | number | boolean;
}

const queryBuilder = (items: VariableToKeyItem[]): string => {
  return items.reduce((query, item) => {
    if (Array.isArray(item.value) && item.value.length) {
      return composeQuery(query, item.key, item.value.join(','));
    } else if (item.value && !Array.isArray(item.value)) {
      return composeQuery(query, item.key, item.value);
    }
    return query;
  }, '');
};

export default queryBuilder;
