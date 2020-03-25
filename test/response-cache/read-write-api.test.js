import { bestfetch, responseCache } from '../../src';

describe('responseCache: read/write API', () => {
  describe('has', () => {
    test('returns true for fresh cached values', done => {
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

    test('returns false for stale cached values unless you specify to include them', done => {
      responseCache.defineStaleness(() => true);
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
        expect(responseCache.has('test')).toBe(false);
        expect(responseCache.has('test', { includeStale: true })).toBe(true);
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
        expect(responseCache.has('test', { includeStale: true })).toBe(false);
        done();
      });
    });
  });

  describe('get', () => {
    test('returns cached results when fresh', done => {
      expect(responseCache.get('test')).toBeUndefined();
      bestfetch('/test/succeeds/json', {
        requestKey: 'test',
      }).then(() => {
        expect(responseCache.get('test').data).toEqual({ a: true });
        done();
      });
    });

    test('ignores stale values by default', done => {
      responseCache.defineStaleness(() => true);

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

          expect(responseCache.has('my-request', { includeStale: true })).toBe(
            true
          );
          expect(responseCache.get('my-request')).toBe(undefined);
          expect(responseCache.has('my-request', { includeStale: true })).toBe(
            true
          );
          done();
        }
      );
    });

    test('can be configured to return stale values', done => {
      responseCache.defineStaleness(() => true);

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

          expect(responseCache.has('my-request', { includeStale: true })).toBe(
            true
          );
          expect(
            responseCache.get('my-request', { includeStale: true }).data
          ).toEqual({ a: true });
          expect(responseCache.has('my-request', { includeStale: true })).toBe(
            true
          );
          done();
        }
      );
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

  describe('purge', () => {
    test('does not purge values if they are all fresh', done => {
      const one = bestfetch('/test/succeeds/json', {
        requestKey: '1',
      });

      const two = bestfetch('/test/succeeds/json', {
        requestKey: '2',
      });

      const three = bestfetch('/test/succeeds/json', {
        requestKey: '3',
      });

      Promise.all([one, two, three]).then(() => {
        expect(responseCache.has('1', { includeStale: true })).toBe(true);
        expect(responseCache.has('2', { includeStale: true })).toBe(true);
        expect(responseCache.has('3', { includeStale: true })).toBe(true);
        responseCache.purge();
        expect(responseCache.has('1', { includeStale: true })).toBe(true);
        expect(responseCache.has('2', { includeStale: true })).toBe(true);
        expect(responseCache.has('3', { includeStale: true })).toBe(true);
        done();
      });
    });

    test('purges only stale values', done => {
      responseCache.defineStaleness(cacheObject => {
        return cacheObject.accessCount >= 1;
      });

      const one = bestfetch('/test/succeeds/json', {
        requestKey: '1',
      });

      const two = bestfetch('/test/succeeds/json', {
        requestKey: '2',
      });

      const three = bestfetch('/test/succeeds/json', {
        requestKey: '3',
      });

      Promise.all([one, two, three]).then(() => {
        expect(responseCache.has('1', { includeStale: true })).toBe(true);
        expect(responseCache.has('2', { includeStale: true })).toBe(true);
        expect(responseCache.has('3', { includeStale: true })).toBe(true);

        bestfetch('/test/succeeds/json', {
          requestKey: '1',
        }).then(() => {
          expect(responseCache.has('1', { includeStale: true })).toBe(true);
          responseCache.purge();
          expect(responseCache.has('1', { includeStale: true })).toBe(false);
          expect(responseCache.has('2', { includeStale: true })).toBe(true);
          expect(responseCache.has('3', { includeStale: true })).toBe(true);
          done();
        });
      });
    });
  });
});