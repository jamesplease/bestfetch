import fetchMock from 'fetch-mock';
import { bestfetch } from '../../src';

describe('bestfetch', () => {
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
});
