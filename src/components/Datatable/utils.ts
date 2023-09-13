const isStringAndContains = (value: any, searchText: string): boolean => {
  return typeof value === 'string' && value.toLowerCase().includes(searchText);
};

export const containsSearchText = (item: any, searchText: string): boolean => {
  const keys = Object.keys(item);
  for (const key of keys) {
    if (isStringAndContains(item[key], searchText.toLowerCase())) {
      return true;
    }
  }
  return false;
};

export const compareTwoObjects = <T,>(obj1: T | null, obj2: T | null) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const extractValuesFromSearchText = (searchText: string) => {
  const pattern = /search:(\w+)\s+group:(\w+)/;
  const match = searchText.match(pattern);

  if (match) {
    return {
      filterText: match[1],
      group: match[2],
    };
  } else {
    return {
      filterText: '',
      group: '',
    };
  }
};

export const comparator = <T,>(a: T, b: T, group: keyof T) => {
  if (!a?.hasOwnProperty(group) || !b?.hasOwnProperty(group)) return 0;

  if (a[group] < b[group]) {
    return -1;
  }
  if (a[group] > b[group]) {
    return 1;
  }
  return 0;
};
