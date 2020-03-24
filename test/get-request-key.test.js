import { getRequestKey } from '../src';

describe('getRequestKey', () => {
  test('it returns a string, even with no inputs', () => {
    const key = getRequestKey();
    expect(typeof key).toBe('string');
  });

  test('it returns a string, even with an empty object input', () => {
    const key = getRequestKey({});
    expect(typeof key).toBe('string');
  });

  test('it returns a string', () => {
    const key = getRequestKey({
      url: '/test/2',
      method: 'GET',
    });
    expect(typeof key).toBe('string');
  });

  test('it ignores the casing of method', () => {
    const keyOne = getRequestKey({
      url: '/test/2',
      method: 'GET',
    });

    const keyTwo = getRequestKey({
      url: '/test/2',
      method: 'get',
    });

    expect(keyOne).toBe(keyTwo);
  });

  test('it produces different keys for different methods', () => {
    const keyOne = getRequestKey({
      url: '/test/2',
      method: 'GET',
    });

    const keyTwo = getRequestKey({
      url: '/test/2',
      method: 'DELETE',
    });

    expect(keyOne).not.toBe(keyTwo);
  });

  test('it produces different keys for different URLs', () => {
    const keyOne = getRequestKey({
      url: '/test/1',
      method: 'GET',
    });

    const keyTwo = getRequestKey({
      url: '/test/2',
      method: 'GET',
    });

    expect(keyOne).not.toBe(keyTwo);
  });

  test('it produces different keys for different options', () => {
    const keyOne = getRequestKey({
      url: '/test/1',
      method: 'GET',
    });

    const keyTwo = getRequestKey({
      url: '/test/1',
      method: 'GET',
      body: 'sandwiches',
    });

    expect(keyOne).not.toBe(keyTwo);
  });
});
