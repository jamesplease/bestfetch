import fetchMock from 'fetch-mock';
import {
  fetchDedupe,
  getRequestKey,
  isRequestInFlight,
  clearRequestCache
} from '../src';
import { successfulResponse, jsonResponse, emptyResponse } from './responses';

beforeEach(() => {
  clearRequestCache();
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

fetchMock.get(
  '/test/succeeds/empty',
  () =>
    new Promise(resolve => {
      resolve(emptyResponse());
    })
);

describe('isRequestInFlight', () => {
  test('renders false when it is not in flight', () => {
    expect(isRequestInFlight('pasta')).toBe(false);
  });

  test('renders true when it is not in flight', () => {
    fetchDedupe('/test/hangs', {}, { requestKey: 'pasta' });
    expect(isRequestInFlight('pasta')).toBe(true);
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
      method: 'GET'
    });
    expect(typeof key).toBe('string');
  });

  test('it ignores the casing of method', () => {
    const keyOne = getRequestKey({
      url: '/test/2',
      method: 'GET'
    });

    const keyTwo = getRequestKey({
      url: '/test/2',
      method: 'get'
    });

    expect(keyOne).toBe(keyTwo);
  });

  test('it produces different keys for different methods', () => {
    const keyOne = getRequestKey({
      url: '/test/2',
      method: 'GET'
    });

    const keyTwo = getRequestKey({
      url: '/test/2',
      method: 'DELETE'
    });

    expect(keyOne).not.toBe(keyTwo);
  });

  test('it produces different keys for different URLs', () => {
    const keyOne = getRequestKey({
      url: '/test/1',
      method: 'GET'
    });

    const keyTwo = getRequestKey({
      url: '/test/2',
      method: 'GET'
    });

    expect(keyOne).not.toBe(keyTwo);
  });

  test('it produces different keys for different options', () => {
    const keyOne = getRequestKey({
      url: '/test/1',
      method: 'GET'
    });

    const keyTwo = getRequestKey({
      url: '/test/1',
      method: 'GET',
      body: 'sandwiches'
    });

    expect(keyOne).not.toBe(keyTwo);
  });
});

describe('fetchDedupe', () => {
  test('only calls fetch once for duplicate requests', () => {
    fetchDedupe(
      '/test/hangs',
      {},
      { requestKey: 'pasta', responseType: 'json' }
    );
    fetchDedupe(
      '/test/hangs',
      {},
      { requestKey: 'pasta', responseType: 'json' }
    );
    fetchDedupe(
      '/test/hangs',
      {},
      { requestKey: 'pasta', responseType: 'json' }
    );
    expect(fetchMock.calls('/test/hangs').length).toBe(1);
  });

  test('respects the dedupe:false option', () => {
    fetchDedupe(
      '/test/hangs',
      {},
      { requestKey: 'pasta', dedupe: false, responseType: 'json' }
    );
    fetchDedupe(
      '/test/hangs',
      {},
      { requestKey: 'pasta', responseType: 'json' }
    );
    fetchDedupe(
      '/test/hangs',
      {},
      { requestKey: 'pasta', responseType: 'json' }
    );
    expect(fetchMock.calls('/test/hangs').length).toBe(2);
  });

  test('allows for optional init', () => {
    fetchDedupe('/test/hangs', { requestKey: 'pasta', responseType: 'json' });
    fetchDedupe('/test/hangs', { requestKey: 'pasta', responseType: 'json' });
    fetchDedupe('/test/hangs', { requestKey: 'pasta', responseType: 'json' });
    expect(fetchMock.calls('/test/hangs').length).toBe(1);
  });

  test('allows for optional request key', () => {
    fetchDedupe('/test/hangs', { responseType: 'json' });
    fetchDedupe('/test/hangs', { responseType: 'json' });
    fetchDedupe('/test/hangs', { responseType: 'json' });
    expect(fetchMock.calls('/test/hangs').length).toBe(1);
  });

  test('allows for optional request key, still producing a unique key', () => {
    // First request to /test/hangs/2
    fetchDedupe('/test/hangs', { responseType: 'json' });
    fetchDedupe('/test/hangs', { responseType: 'json' });

    // First request to /test/hangs
    fetchDedupe('/test/hangs/2', { responseType: 'json' });
    fetchDedupe('/test/hangs/2', { responseType: 'json' });

    // Second request to /test/hangs/2
    fetchDedupe('/test/hangs/2', { body: 'hello' }, { responseType: 'json' });

    expect(fetchMock.calls('/test/hangs').length).toBe(1);
    expect(fetchMock.calls('/test/hangs/2').length).toBe(2);
  });

  test('supports a Request as input', () => {
    const req = new Request('/test/hangs', {
      method: 'GET'
    });
    fetchDedupe(req, { responseType: 'json' });
    fetchDedupe(req, { responseType: 'json' });
    fetchDedupe(req, { responseType: 'json' });
    expect(fetchMock.calls('/test/hangs').length).toBe(1);
  });

  test('prefers init values with request values', () => {
    const req = new Request('/test/hangs', {
      method: 'GET',
      body: 'what'
    });

    fetchDedupe(req, { method: 'PATCH', body: 'ok' }, { responseType: 'json' });
    fetchDedupe(
      '/test/hangs',
      { method: 'PATCH', body: 'ok' },
      { responseType: 'json' }
    );
    expect(fetchMock.calls('/test/hangs').length).toBe(1);
  });

  test('requests that succeeds with JSON, with no response type specified, to behave as expected', done => {
    fetchDedupe('/test/succeeds/json').then(res => {
      expect(res).toEqual(
        expect.objectContaining({
          data: {
            a: true
          },
          status: 200,
          statusText: 'OK',
          bodyUsed: true,
          ok: true
        })
      );
      done();
    });
  });

  test('requests that succeeds with JSON, with function as response type, to behave as expected', done => {
    const responseType = res => {
      return res.ok ? 'json' : 'text';
    }
    fetchDedupe('/test/succeeds/json', { responseType }).then(res => {
      expect(res).toEqual(
        expect.objectContaining({
          data: {
            a: true
          },
          status: 200,
          statusText: 'OK',
          bodyUsed: true,
          ok: true
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
    }
    fetchDedupe(
      '/test/fails/text',
      { responseType }
    ).then(
      () => done.fail(),
      err => {
        expect(err).toEqual('Failed');
        done();
      }
    );
  });

  test('requests that succeeds with empty responses, with no response type specified, to behave as expected', done => {
    fetchDedupe('/test/succeeds/empty').then(res => {
      expect(res).toEqual(
        expect.objectContaining({
          data: '',
          status: 204,
          statusText: 'OK',
          bodyUsed: true,
          ok: true
        })
      );
      done();
    });
  });

  test('non-deduped requests that succeed to behave as expected', done => {
    fetchDedupe(
      '/test/succeeds',
      {},
      { requestKey: 'pasta', dedupe: false, responseType: 'text' }
    ).then(res => {
      expect(res).toEqual(
        expect.objectContaining({
          data: 'hi',
          status: 200,
          statusText: 'OK',
          bodyUsed: true,
          ok: true
        })
      );
      done();
    });
  });

  test('non-deduped requests that succeeds with JSON to behave as expected', done => {
    fetchDedupe('/test/succeeds/json', {
      requestKey: 'pasta',
      dedupe: false,
      responseType: 'json'
    }).then(res => {
      expect(res).toEqual(
        expect.objectContaining({
          data: {
            a: true
          },
          status: 200,
          statusText: 'OK',
          bodyUsed: true,
          ok: true
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
          message: 'Network error'
        });
      })
    );

    fetchDedupe(
      '/test/fails',
      {},
      { requestKey: 'pasta', dedupe: false, responseType: 'text' }
    ).then(
      () => done.fail(),
      err => {
        expect(err).toEqual(
          expect.objectContaining({
            message: 'Network error'
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

    const requestOne = fetchDedupe(
      '/test/succeeds/dedupe',
      {},
      { requestKey: 'pasta', responseType: 'text' }
    );

    const requestTwo = fetchDedupe(
      '/test/succeeds/dedupe',
      {},
      { requestKey: 'pasta', responseType: 'text' }
    );

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
          message: 'Network error'
        });
      })
    );

    const requestOne = fetchDedupe(
      '/test/fails/dedupe',
      {},
      { requestKey: 'pasta', responseType: 'text' }
    );

    const requestTwo = fetchDedupe(
      '/test/fails/dedupe',
      {},
      { requestKey: 'pasta', responseType: 'text' }
    );

    Promise.all([requestOne, requestTwo]).then(
      () => done.fail(),
      err => {
        expect(fetchMock.calls('/test/fails/dedupe').length).toBe(1);
        expect(err).toEqual(
          expect.objectContaining({
            message: 'Network error'
          })
        );
        done();
      }
    );
  });
});
