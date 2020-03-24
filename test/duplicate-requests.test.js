import { bestfetch, duplicateRequests } from '../src';

describe('duplicateRequests', () => {
  describe('isRequestInFlight', () => {
    test('renders false when it is not in flight', () => {
      expect(duplicateRequests.isRequestInFlight('pasta')).toBe(false);
    });

    test('renders true when it is not in flight', () => {
      bestfetch('/test/hangs', { requestKey: 'pasta' });
      expect(duplicateRequests.isRequestInFlight('pasta')).toBe(true);
    });
  });
});
