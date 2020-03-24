import fetchMock from 'fetch-mock';
import { bestfetch, responseCache } from '../../src';

describe('responseCache.cacheWritePolicy', () => {
  test('It errors if you pass an invalid function', () => {
    expect(() => {
      responseCache.configureCacheWritePolicy({});
    }).toThrow();
  });

  test('default does not cache 500 server errors', done => {
    bestfetch('/test/fails/internal-server-error', {
      requestKey: 'will-error',
      responseType: 'text',
    }).then(res => {
      expect(res).toEqual(
        expect.objectContaining({
          data: 'Server error message',
          status: 500,
          statusText: 'Internal Server Error',
          ok: false,
        })
      );

      expect(responseCache.has('will-error')).toBe(false);

      bestfetch('/test/fails/internal-server-error', {
        requestKey: 'will-error',
        responseType: 'text',
      }).then(resTwo => {
        expect(resTwo).toEqual(
          expect.objectContaining({
            data: 'Server error message',
            status: 500,
            statusText: 'Internal Server Error',
            ok: false,
          })
        );
        expect(responseCache.has('will-error')).toBe(false);
        expect(
          fetchMock.calls('/test/fails/internal-server-error').length
        ).toBe(2);
        done();
      });
    });
  });
});
