import fetchMock from 'fetch-mock';
import { bestfetch, responseCache, CacheMissError } from '../../src';

describe('bestfetch: cachePolicy', () => {
  test('Defaults with a GET should be cache-first', done => {
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

      expect(responseCache.has('my-request')).toBe(true);

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
          done();
        }
      );
    });
  });

  test('network-only ignores the cache', done => {
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

      expect(responseCache.has('my-request')).toBe(true);

      bestfetch('/test/succeeds/json', {
        requestKey: 'my-request',
        cachePolicy: 'network-only',
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
        expect(fetchMock.calls('/test/succeeds/json').length).toBe(2);
        done();
      });
    });
  });

  test('no-cache does not write to the cache', done => {
    bestfetch('/test/succeeds/json', {
      requestKey: 'my-request',
      cachePolicy: 'no-cache',
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

      expect(responseCache.has('my-request')).toBe(false);
      done();
    });
  });

  test('no-cache will not read from the cache', done => {
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
      expect(responseCache.has('my-request')).toBe(true);

      bestfetch('/test/succeeds/json', {
        requestKey: 'my-request',
        cachePolicy: 'no-cache',
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
        expect(responseCache.has('my-request')).toBe(true);
        expect(fetchMock.calls('/test/succeeds/json').length).toBe(2);
        done();
      });
    });
  });

  test('default for "write" requests is network-only', done => {
    bestfetch('/test/succeeds/json', {
      requestKey: 'my-request',
      method: 'POST',
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

      expect(responseCache.has('my-request')).toBe(true);

      bestfetch('/test/succeeds/json', {
        requestKey: 'my-request',
        method: 'POST',
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
        expect(fetchMock.calls('/test/succeeds/json').length).toBe(2);
        done();
      });
    });
  });

  test('cache options work for "write" requests, too', done => {
    bestfetch('/test/succeeds/json', {
      method: 'POST',
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

      bestfetch('/test/succeeds/json', {
        method: 'POST',
        cachePolicy: 'cache-first',
      }).then(resTwo => {
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
        done();
      });
    });
  });

  test('cache-only with empty cache rejects with an Error', done => {
    bestfetch('/test/succeeds/json', { cachePolicy: 'cache-only' }).then(
      () => done.fail(),
      err => {
        expect(err instanceof CacheMissError).toBe(true);
        expect(err).toEqual(
          expect.objectContaining({
            message: 'Response for fetch request not found in cache.',
            name: 'CacheMissError',
          })
        );
        done();
      }
    );
  });
});
