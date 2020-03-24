import fetchMock from 'fetch-mock';
import { bestfetch, responseCache } from '../../src';

describe('responseCache.defineFreshness', () => {
  test('It errors if you pass an invalid function', () => {
    expect(() => {
      responseCache.defineFreshness({});
    }).toThrow();
  });

  test('Overriding it to ignore the entire cache should work', done => {
    responseCache.defineFreshness(() => false);

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

      bestfetch('/test/succeeds/json').then(resTwo => {
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
        expect(fetchMock.calls('/test/succeeds/json').length).toBe(2);
        done();
      });
    });
  });

  test('Overriding it to ignore cached responses after 1 read should work', done => {
    responseCache.defineFreshness(cacheObject => {
      return cacheObject.accessCount < 1;
    });

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

      bestfetch('/test/succeeds/json').then(resTwo => {
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

        bestfetch('/test/succeeds/json').then(resThree => {
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
          done();
        });
      });
    });
  });
});
