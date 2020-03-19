import fetchMock from 'fetch-mock';
import {
  bestfetch,
  getRequestKey,
  activeRequests,
  responseCache,
} from '../src';
import {
  successfulResponse,
  jsonResponse,
  emptyResponse,
  serverErrorResponse,
} from './responses';

beforeEach(() => {
  activeRequests.clear();
  responseCache.clear();
});

function hangingPromise() {
  return new Promise(() => {});
}

fetchMock.get('/test/hangs', hangingPromise());
fetchMock.get('/test/hangs/2', hangingPromise());
fetchMock.get(
  '/test/succeeds',
  () =>
    new Promise(resolve => {
      resolve(successfulResponse());
    })
);

fetchMock.get(
  '/test/succeeds/json',
  () =>
    new Promise(resolve => {
      resolve(jsonResponse());
    })
);

fetchMock.post(
  '/test/succeeds/json',
  () =>
    new Promise(resolve => {
      resolve(jsonResponse());
    })
);

fetchMock.get(
  '/test/succeeds/empty',
  () =>
    new Promise(resolve => {
      resolve(emptyResponse());
    })
);

fetchMock.get(
  '/test/fails/internal-server-error',
  () =>
    new Promise(resolve => {
      resolve(serverErrorResponse());
    })
);

describe('activeRequests.isRequestInFlight', () => {
  test('renders false when it is not in flight', () => {
    expect(activeRequests.isRequestInFlight('pasta')).toBe(false);
  });

  test('renders true when it is not in flight', () => {
    bestfetch('/test/hangs', { requestKey: 'pasta' });
    expect(activeRequests.isRequestInFlight('pasta')).toBe(true);
  });
});

describe('getRequestKey', () => {
  test('it returns a string, even with no inputs', () => {
    const key = getRequestKey();
    expect(typeof key).toBe('string');
  });

  test('it returns a string, even with an empty object input', () => {
    const key = getRequestKey({});
    expect(typeof key).toBe('string');
  });

  test('it returns a string', () => {
    const key = getRequestKey({
      url: '/test/2',
      method: 'GET',
    });
    expect(typeof key).toBe('string');
  });

  test('it ignores the casing of method', () => {
    const keyOne = getRequestKey({
      url: '/test/2',
      method: 'GET',
    });

    const keyTwo = getRequestKey({
      url: '/test/2',
      method: 'get',
    });

    expect(keyOne).toBe(keyTwo);
  });

  test('it produces different keys for different methods', () => {
    const keyOne = getRequestKey({
      url: '/test/2',
      method: 'GET',
    });

    const keyTwo = getRequestKey({
      url: '/test/2',
      method: 'DELETE',
    });

    expect(keyOne).not.toBe(keyTwo);
  });

  test('it produces different keys for different URLs', () => {
    const keyOne = getRequestKey({
      url: '/test/1',
      method: 'GET',
    });

    const keyTwo = getRequestKey({
      url: '/test/2',
      method: 'GET',
    });

    expect(keyOne).not.toBe(keyTwo);
  });

  test('it produces different keys for different options', () => {
    const keyOne = getRequestKey({
      url: '/test/1',
      method: 'GET',
    });

    const keyTwo = getRequestKey({
      url: '/test/1',
      method: 'GET',
      body: 'sandwiches',
    });

    expect(keyOne).not.toBe(keyTwo);
  });
});

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

describe('responseCache.has', () => {
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

describe('responseCache.get', () => {
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

describe('responseCache.set', () => {
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
