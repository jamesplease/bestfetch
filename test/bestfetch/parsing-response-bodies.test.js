import fetchMock from 'fetch-mock';
import { bestfetch, responseCache } from '../../src';

describe('bestfetch: parsing response bodies', () => {
  test('requests that succeeds with JSON, with no response type specified, to behave as expected', done => {
    bestfetch('/test/succeeds/json').then(res => {
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
      done();
    });
  });

  test('requests that succeeds with JSON, with function as response type, to behave as expected', done => {
    const responseType = res => {
      return res.ok ? 'json' : 'text';
    };
    bestfetch('/test/succeeds/json', { responseType }).then(res => {
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
      done();
    });
  });

  test('requests that fails with text responses, with function as response type, to behave as expected', done => {
    fetchMock.get(
      '/test/fails/text',
      new Promise((resolve, reject) => {
        reject('Failed');
      })
    );

    const responseType = res => {
      return res.ok ? 'json' : 'text';
    };
    bestfetch('/test/fails/text', { responseType }).then(
      () => done.fail(),
      err => {
        expect(err).toEqual('Failed');
        done();
      }
    );
  });

  test('requests that succeeds with empty responses, with no response type specified, to behave as expected', done => {
    bestfetch('/test/succeeds/empty').then(res => {
      expect(res).toEqual(
        expect.objectContaining({
          data: '',
          status: 204,
          statusText: 'OK',
          ok: true,
        })
      );
      done();
    });
  });

  test('requests that fails with text responses, with no response type specified, to behave as expected', done => {
    bestfetch('/test/fails/internal-server-error').then(res => {
      expect(res).toEqual(
        expect.objectContaining({
          data: null,
          status: 500,
          statusText: 'Internal Server Error',
          ok: false,
        })
      );
      done();
    });
  });

  describe('tests that fail to parse (gh-65)', () => {
    test('are still added to the cache (gh-65)', done => {
      bestfetch('/test/succeeds', {
        requestKey: 'pasta',
      }).then(res => {
        expect(res).toEqual(
          expect.objectContaining({
            data: null,
            status: 200,
            statusText: 'OK',
            ok: true,
          })
        );
        expect(responseCache.has('pasta', { includeStale: true })).toBe(true);
        done();
      });
    });

    test('respect options that ignore the cache (gh-65)', done => {
      bestfetch('/test/succeeds', {
        requestKey: 'pasta',
        cachePolicy: 'no-cache',
      }).then(res => {
        expect(res).toEqual(
          expect.objectContaining({
            data: null,
            status: 200,
            statusText: 'OK',
            ok: true,
          })
        );
        expect(responseCache.has('pasta', { includeStale: true })).toBe(false);
        done();
      });
    });
  });
});
