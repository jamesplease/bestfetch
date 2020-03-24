import fetchMock from 'fetch-mock';
import { bestfetch } from '../../src';
import { successfulResponse } from '../responses';

describe('bestfetch', () => {
  describe('dedupe: true', () => {
    test('only calls fetch once for duplicate requests', () => {
      bestfetch('/test/hangs', { requestKey: 'pasta', responseType: 'json' });
      bestfetch('/test/hangs', { requestKey: 'pasta', responseType: 'json' });
      bestfetch('/test/hangs', { requestKey: 'pasta', responseType: 'json' });
      expect(fetchMock.calls('/test/hangs').length).toBe(1);
    });

    test('deduped requests that succeed to behave as expected', done => {
      fetchMock.get(
        '/test/fails/dedupe',
        new Promise((resolve, reject) => {
          reject({
            message: 'Network error',
          });
        })
      );

      const requestOne = bestfetch('/test/fails/dedupe', {
        requestKey: 'pasta',
        responseType: 'text',
      });

      const requestTwo = bestfetch('/test/fails/dedupe', {
        requestKey: 'pasta',
        responseType: 'text',
      });

      Promise.all([requestOne, requestTwo]).then(
        () => done.fail(),
        err => {
          expect(fetchMock.calls('/test/fails/dedupe').length).toBe(1);
          expect(err).toEqual(
            expect.objectContaining({
              message: 'Network error',
            })
          );
          done();
        }
      );
    });

    test('deduped requests that succeed to behave as expected', done => {
      fetchMock.get(
        '/test/succeeds/dedupe',
        new Promise(resolve => {
          resolve(successfulResponse());
        })
      );

      const requestOne = bestfetch('/test/succeeds/dedupe', {
        requestKey: 'pasta',
        responseType: 'text',
      });

      const requestTwo = bestfetch('/test/succeeds/dedupe', {
        requestKey: 'pasta',
        responseType: 'text',
      });

      Promise.all([requestOne, requestTwo]).then(([resOne, resTwo]) => {
        expect(fetchMock.calls('/test/succeeds/dedupe').length).toBe(1);
        expect(resOne).toEqual(resTwo);
        done();
      });
    });
  });

  describe('dedupe: false', () => {
    test('respects the dedupe:false option', () => {
      bestfetch('/test/hangs', {
        requestKey: 'pasta',
        dedupe: false,
        responseType: 'json',
      });
      bestfetch('/test/hangs', { requestKey: 'pasta', responseType: 'json' });
      bestfetch('/test/hangs', { requestKey: 'pasta', responseType: 'json' });
      expect(fetchMock.calls('/test/hangs').length).toBe(2);
    });

    test('non-deduped requests that succeed to behave as expected', done => {
      bestfetch('/test/succeeds', {
        requestKey: 'pasta',
        dedupe: false,
        responseType: 'text',
      }).then(res => {
        expect(res).toEqual(
          expect.objectContaining({
            data: 'hi',
            status: 200,
            statusText: 'OK',
            ok: true,
          })
        );
        done();
      });
    });

    test('non-deduped requests that succeed, but cannot be parsed, behave as expected', done => {
      bestfetch('/test/succeeds', {
        requestKey: 'pasta',
        dedupe: false,
      }).then(res => {
        expect(res).toEqual(
          expect.objectContaining({
            data: null,
            status: 200,
            statusText: 'OK',
            ok: true,
          })
        );
        done();
      });
    });

    test('non-deduped requests that succeeds with JSON to behave as expected', done => {
      bestfetch('/test/succeeds/json', {
        requestKey: 'pasta',
        dedupe: false,
        responseType: 'json',
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
        done();
      });
    });

    test('non-deduped requests with a network error to behave as expected', done => {
      fetchMock.get(
        '/test/fails',
        new Promise((resolve, reject) => {
          reject({
            message: 'Network error',
          });
        })
      );

      bestfetch('/test/fails', {
        requestKey: 'pasta',
        dedupe: false,
        responseType: 'text',
      }).then(
        () => done.fail(),
        err => {
          expect(err).toEqual(
            expect.objectContaining({
              message: 'Network error',
            })
          );
          done();
        }
      );
    });
  });
});
