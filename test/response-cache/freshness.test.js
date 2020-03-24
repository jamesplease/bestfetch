import fetchMock from 'fetch-mock';
import { bestfetch, responseCache } from '../../src';

describe('responseCache: freshness', () => {
  test('It errors if you pass an invalid function to defineFreshness', () => {
    expect(() => {
      responseCache.defineFreshness({});
    }).toThrow();
  });

  describe('responseCache.isFresh', () => {
    test('returns false when a value is not in the cache', () => {
      expect(responseCache.has('my-request')).toBe(false);
      expect(responseCache.isFresh('my-request')).toBe(false);
    });

    test('returns true when a request is in the cache, and it is fresh', done => {
      bestfetch('/test/succeeds/json', { requestKey: 'my-request' }).then(
        res => {
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

          expect(responseCache.has('my-request')).toBe(true);
          expect(responseCache.isFresh('my-request')).toBe(true);
          done();
        }
      );
    });

    test('returns false when a value is in the cache, but is not fresh', done => {
      responseCache.defineFreshness(() => false);

      bestfetch('/test/succeeds/json', { requestKey: 'my-request' }).then(
        res => {
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

          expect(responseCache.has('my-request')).toBe(true);
          expect(responseCache.isFresh('my-request')).toBe(false);
          expect(responseCache.has('my-request')).toBe(true);
          done();
        }
      );
    });

    test('can be used to remove stale values', done => {
      responseCache.defineFreshness(() => false);

      bestfetch('/test/succeeds/json', { requestKey: 'my-request' }).then(
        res => {
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

          expect(responseCache.has('my-request')).toBe(true);
          expect(
            responseCache.isFresh('my-request', { purgeIfStale: true })
          ).toBe(false);
          expect(responseCache.has('my-request')).toBe(false);
          done();
        }
      );
    });

    test('does not remove fresh values when purgeIfStale is false', done => {
      bestfetch('/test/succeeds/json', { requestKey: 'my-request' }).then(
        res => {
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

          expect(responseCache.has('my-request')).toBe(true);
          expect(
            responseCache.isFresh('my-request', { purgeIfStale: true })
          ).toBe(true);
          expect(responseCache.has('my-request')).toBe(true);
          done();
        }
      );
    });
  });

  test('Overriding the default freshness definition to ignore the entire cache should work', done => {
    responseCache.defineFreshness(() => false);

    bestfetch('/test/succeeds/json', { requestKey: 'my-request' }).then(res => {
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

      expect(responseCache.isFresh('my-request')).toBe(false);

      bestfetch('/test/succeeds/json', { requestKey: 'my-request' }).then(
        resTwo => {
          expect(resTwo).toEqual(
            expect.objectContaining({
              data: {
                a: true,
              },
              status: 200,
              statusText: 'OK',
              ok: true,
            })
          );
          expect(responseCache.isFresh('my-request')).toBe(false);
          expect(fetchMock.calls('/test/succeeds/json').length).toBe(2);
          done();
        }
      );
    });
  });

  test('Overriding it to ignore cached responses after 1 read should work', done => {
    responseCache.defineFreshness(cacheObject => {
      return cacheObject.accessCount < 1;
    });

    bestfetch('/test/succeeds/json', { requestKey: 'my-request' }).then(res => {
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

      expect(responseCache.isFresh('my-request')).toBe(true);

      bestfetch('/test/succeeds/json', { requestKey: 'my-request' }).then(
        resTwo => {
          expect(resTwo).toEqual(
            expect.objectContaining({
              data: {
                a: true,
              },
              status: 200,
              statusText: 'OK',
              ok: true,
            })
          );
          expect(fetchMock.calls('/test/succeeds/json').length).toBe(1);
          expect(responseCache.isFresh('my-request')).toBe(false);

          bestfetch('/test/succeeds/json', { requestKey: 'my-request' }).then(
            resThree => {
              expect(resThree).toEqual(
                expect.objectContaining({
                  data: {
                    a: true,
                  },
                  status: 200,
                  statusText: 'OK',
                  ok: true,
                })
              );
              expect(fetchMock.calls('/test/succeeds/json').length).toBe(2);
              expect(responseCache.isFresh('my-request')).toBe(true);
              done();
            }
          );
        }
      );
    });
  });
});
