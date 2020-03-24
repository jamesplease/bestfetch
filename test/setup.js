import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import { duplicateRequests, responseCache } from '../src';
import { defaultReadPolicy, defaultWritePolicy } from '../src/response-cache';

beforeEach(() => {
  fetchMock.reset();

  duplicateRequests.clear();
  responseCache.clear();

  responseCache.configureCacheReadPolicy(defaultReadPolicy);
  responseCache.configureCacheWritePolicy(defaultWritePolicy);
});
