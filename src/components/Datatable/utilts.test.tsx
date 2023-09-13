import {
  comparator,
  compareTwoObjects,
  containsSearchText,
  extractValuesFromSearchText,
  isStringAndContains,
} from './utils'; // Import your utility function

describe('isStringAndContains', () => {
  test('should return true if value is a string and contains searchText (case insensitive)', () => {
    expect(isStringAndContains('Hello, World!', 'world')).toBe(true);

    expect(isStringAndContains('Microsoft', 'micro')).toBe(true);
  });

  test('should return false if value is not a string', () => {
    expect(isStringAndContains(123, '123')).toBe(false);

    expect(isStringAndContains(null, 'null')).toBe(false);

    expect(isStringAndContains(undefined, 'undefined')).toBe(false);

    expect(isStringAndContains({}, 'object')).toBe(false);
  });

  test('should return false if value is a string but does not contain searchText', () => {
    expect(isStringAndContains('Hello, World!', 'foo')).toBe(false);

    expect(isStringAndContains('Cake', 'Lahmacun')).toBe(false);
  });
});

describe('containsSearchText', () => {
  test('should return true if any property of the object contains searchText (case insensitive)', () => {
    // Test cases
    const obj1 = { name: 'John', email: 'john@example.com' };
    const obj2 = { name: 'Alice', description: 'Alice Smith' };

    expect(containsSearchText(obj1, 'JOHN')).toBe(true);

    expect(containsSearchText(obj2, 'sMiTh')).toBe(true);
  });

  test('should return false if none of the properties contain searchText', () => {
    // Test cases
    const obj3 = { title: 'Software Engineer', skills: 'JavaScript, Python' };
    const obj4 = { age: 30, salary: 50000 };

    expect(containsSearchText(obj3, 'PHP')).toBe(false);

    expect(containsSearchText(obj4, 'Manager')).toBe(false);
  });

  test('should return false if the input object is empty', () => {
    // Test cases with empty objects
    const emptyObj = {};

    expect(containsSearchText(emptyObj, 'text')).toBe(false);
  });
});

describe('compareTwoObjects', () => {
  it('should return true if two objects have the same properties and values', () => {
    // Test cases
    const obj1 = { name: 'John', age: 30 };
    const obj2 = { name: 'John', age: 30 };

    expect(compareTwoObjects(obj1, obj2)).toBe(true);
  });

  it('should return false if two objects have the same properties but different values', () => {
    // Test cases
    const obj5 = { name: 'Eve', age: 28 };
    const obj6 = { name: 'Eve', age: 30 };

    expect(compareTwoObjects(obj5, obj6)).toBe(false);
  });

  it('should return true if both objects are null', () => {
    // Test cases with null objects
    const obj7 = null;
    const obj8 = null;

    expect(compareTwoObjects(obj7, obj8)).toBe(true);
  });

  it('should return false if one object is null and the other is not', () => {
    // Test cases with one null object
    const obj9 = { name: 'Grace', age: 22 };
    const obj10 = null;

    expect(compareTwoObjects(obj9, obj10)).toBe(false);
  });
});

describe('extractValuesFromSearchText', () => {
  it('should correctly extract values from search text', () => {
    // Test cases
    const searchText1 = 'search:keyword group:team';
    const searchText2 = 'search:term group:category';

    expect(extractValuesFromSearchText(searchText1)).toEqual({
      filterText: 'keyword',
      group: 'team',
    });
    expect(extractValuesFromSearchText(searchText2)).toEqual({
      filterText: 'term',
      group: 'category',
    });
  });

  it('should handle empty search text', () => {
    // Test case with empty search text
    const searchText3 = '';

    expect(extractValuesFromSearchText(searchText3)).toEqual({
      filterText: '',
      group: '',
    });
  });

  it('should return empty values if pattern is not matched', () => {
    // Test case with no matching pattern
    const searchText4 = 'This is a test';

    expect(extractValuesFromSearchText(searchText4)).toEqual({
      filterText: '',
      group: '',
    });
  });
});

describe('comparator', () => {
  it('should return -1 if a[group] is less than b[group]', () => {
    const obj3 = { name: 'Alice', age: 25 };
    const obj4 = { name: 'Bob', age: 30 };

    expect(comparator(obj3, obj4, 'age')).toBe(-1);
  });

  it('should return 1 if a[group] is greater than b[group]', () => {
    const obj5 = { name: 'Eve', salary: 5000 };
    const obj6 = { name: 'Grace', salary: 3000 };

    expect(comparator(obj5, obj6, 'salary')).toBe(1);
  });

  it('should return 0 if a[group] is equal to b[group]', () => {
    const obj7 = { name: 'John', score: 95 };
    const obj8 = { name: 'Alice', score: 95 };

    expect(comparator(obj7, obj8, 'score')).toBe(0);
  });
});
