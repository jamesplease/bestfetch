import { bestfetch, responseCache } from '../../src';

describe('responseCache: read/write API', () => {
  describe('has', () => {
    test('behaves as expected', done => {
      expect(responseCache.has('test')).toBe(false);
      bestfetch('/test/succeeds/json', {
        requestKey: 'test',
      }).then(res => {
        expect(res).toEqual(
          expect.objectContaining({
            data: {
              a: true,
            },
            status: 200,
            statusText: 'OK',
            ok: true,
          })
        );
        expect(responseCache.has('test')).toBe(true);
        done();
      });
    });
  });

  describe('delete', () => {
    test('behaves as expected', done => {
      expect(responseCache.delete('test')).toBe(false);
      bestfetch('/test/succeeds/json', {
        requestKey: 'test',
      }).then(res => {
        expect(res).toEqual(
          expect.objectContaining({
            data: {
              a: true,
            },
            status: 200,
            statusText: 'OK',
            ok: true,
          })
        );
        expect(responseCache.delete('test')).toBe(true);
        expect(responseCache.has('test')).toBe(false);
        done();
      });
    });
  });

  describe('get', () => {
    test('behaves as expected', done => {
      expect(responseCache.get('test')).toBeUndefined();
      bestfetch('/test/succeeds/json', {
        requestKey: 'test',
      }).then(() => {
        expect(responseCache.get('test').data).toEqual({ a: true });
        done();
      });
    });
  });

  describe('set', () => {
    test('behaves as expected when cache has response', done => {
      bestfetch('/test/succeeds/json', {
        requestKey: 'test',
      }).then(() => {
        const response = responseCache.get('test');
        expect(response.data).toEqual({ a: true });
        responseCache.set(
          'test',
          Object.assign({}, response, {
            data: { a: false },
          })
        );
        expect(responseCache.get('test').data).toEqual({ a: false });
        done();
      });
    });
    test('behaves as expected when response has not been cached', () => {
      const response = responseCache.get('test');
      expect(response).toBeUndefined();
      responseCache.set('test', { data: { a: false } });
      const newResponse = responseCache.get('test');
      expect(newResponse).toEqual({ data: { a: false } });
    });
  });
});
