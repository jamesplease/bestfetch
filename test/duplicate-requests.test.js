import { bestfetch, duplicateRequests } from '../src';

describe('duplicateRequests', () => {
  describe('isRequestInFlight', () => {
    test('renders false when it is not in flight', () => {
      expect(duplicateRequests.isRequestInFlight('pasta')).toBe(false);
    });

    test('renders true when it is not in flight', () => {
      bestfetch('/test/hangs', {
        requestKey: 'pasta',
      });
      expect(duplicateRequests.isRequestInFlight('pasta')).toBe(true);
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
});
