import fetchMock from 'fetch-mock';
import { bestfetch, responseCache, CacheMissError } from '../src';
import { successfulResponse } from './responses';

describe('bestfetch', () => {
  test('only calls fetch once for duplicate requests', () => {
    bestfetch('/test/hangs', { requestKey: 'pasta', responseType: 'json' });
    bestfetch('/test/hangs', { requestKey: 'pasta', responseType: 'json' });
    bestfetch('/test/hangs', { requestKey: 'pasta', responseType: 'json' });
    expect(fetchMock.calls('/test/hangs').length).toBe(1);
  });

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

  test('allows for optional init', () => {
    bestfetch('/test/hangs', { requestKey: 'pasta', responseType: 'json' });
    bestfetch('/test/hangs', { requestKey: 'pasta', responseType: 'json' });
    bestfetch('/test/hangs', { requestKey: 'pasta', responseType: 'json' });
    expect(fetchMock.calls('/test/hangs').length).toBe(1);
  });

  test('allows for optional dedupeOptions', () => {
    bestfetch('/test/hangs', { headers: { Authorization: 'Bearer abc123' } });
    bestfetch('/test/hangs', { headers: { Authorization: 'Bearer abc123' } });
    bestfetch('/test/hangs', { headers: { Authorization: 'Bearer abc123' } });
    expect(fetchMock.calls('/test/hangs').length).toBe(1);
    expect(fetchMock.lastOptions('/test/hangs')).toEqual({
      headers: { Authorization: 'Bearer abc123' },
    });
  });

  test('allows for optional request key', () => {
    bestfetch('/test/hangs', { responseType: 'json' });
    bestfetch('/test/hangs', { responseType: 'json' });
    bestfetch('/test/hangs', { responseType: 'json' });
    expect(fetchMock.calls('/test/hangs').length).toBe(1);
  });

  test('allows for optional request key, still producing a unique key', () => {
    // First request to /test/hangs/2
    bestfetch('/test/hangs', { responseType: 'json' });
    bestfetch('/test/hangs', { responseType: 'json' });

    // First request to /test/hangs
    bestfetch('/test/hangs/2', { responseType: 'json' });
    bestfetch('/test/hangs/2', { responseType: 'json' });

    // Second request to /test/hangs/2
    bestfetch('/test/hangs/2', { body: 'hello', responseType: 'json' });

    expect(fetchMock.calls('/test/hangs').length).toBe(1);
    expect(fetchMock.calls('/test/hangs/2').length).toBe(2);
  });

  test('supports a Request as input', () => {
    const req = new Request('/test/hangs', {
      method: 'GET',
    });
    bestfetch(req, { responseType: 'json' });
    bestfetch(req, { responseType: 'json' });
    bestfetch(req, { responseType: 'json' });
    expect(fetchMock.calls('/test/hangs').length).toBe(1);
  });

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

  // Note: clearing `duplicateRequests` will prevent any deduped request from ever resolving. This is
  // because we always return the proxy request from a deduped request, rather than the actual request.
  // test('deduped requests that wipe the duplicateRequests store mid-flight do not error', done => {
  //   bestfetch('/test/succeeds/json', {
  //     requestKey: 'pasta',
  //     responseType: 'text',
  //   }).then(() => {
  //     expect(fetchMock.calls('/test/succeeds/json').length).toBe(1);
  //     done();
  //   });
  //   duplicateRequests.clear();
  // });

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
});

describe('cachePolicy', () => {
  test('Defaults with a GET should be cache-first', done => {
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
        done();
      });
    });
  });

  test('network-only ignores the cache', done => {
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

      bestfetch('/test/succeeds/json', { cachePolicy: 'network-only' }).then(
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
          expect(fetchMock.calls('/test/succeeds/json').length).toBe(2);
          done();
        }
      );
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
