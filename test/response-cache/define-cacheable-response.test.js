import fetchMock from 'fetch-mock';
import { bestfetch, responseCache } from '../../src';

describe('responseCache.defineCacheableResponse', () => {
  test('It errors if you pass an invalid function', () => {
    expect(() => {
      responseCache.defineCacheableResponse({});
    }).toThrow();
  });

  test('default does not cache 500 server errors', (done) => {
    bestfetch('/test/fails/internal-server-error', {
      requestKey: 'will-error',
      responseType: 'text',
    }).catch((res) => {
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
      }).catch((resTwo) => {
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
