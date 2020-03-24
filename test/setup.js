import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import { duplicateRequests, responseCache } from '../src';
import { defaultReadPolicy, defaultWritePolicy } from '../src/response-cache';
import {
  successfulResponse,
  jsonResponse,
  emptyResponse,
  serverErrorResponse,
} from './responses';

beforeEach(() => {
  fetchMock.reset();

  duplicateRequests.clear();
  responseCache.clear();

  responseCache.configureCacheReadPolicy(defaultReadPolicy);
  responseCache.configureCacheWritePolicy(defaultWritePolicy);
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
