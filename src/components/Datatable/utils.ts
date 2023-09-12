const isStringAndContains = (value: any, searchText: string): boolean => {
  return typeof value === 'string' && value.toLowerCase().includes(searchText);
}

export const containsSearchText = (item: any, searchText: string): boolean => {
  const keys = Object.keys(item);
  for (const key of keys) {
    if (isStringAndContains(item[key], searchText.toLowerCase())) {
      return true;
    }
  }
  return false;
}

export const compareTwoObjects= <T>(obj1: T | null, obj2: T | null) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};