import generateResponse, { BestFetchResponse } from './generate-response';
import { ExtendedResponse } from './interfaces';

interface CacheObject {
  accessCount: number;
  createdAt: number;
  lastAccessedAt: null | number;
  res: BestFetchResponse;
}

interface ResponseCacheStore {
  [Key: string]: CacheObject;
  [Key: number]: CacheObject;
}

let responseCacheStore: ResponseCacheStore = {};

// By default we always read from the cache when a value exists.
export const defaultStalenessDefinition = (cacheObject: CacheObject) => false;
// By default server errors are not cached, but every other successful response is.
export const defaultCacheableResponse = (res: ExtendedResponse) => {
  if (res.status >= 500) {
    return false;
  } else {
    return true;
  }
};

let stalenessDefinitionFn = defaultStalenessDefinition;
let cacheableResponseFn = defaultCacheableResponse;

const responseCache = {
  get(requestKey: string, { includeStale = false } = {}) {
    let shouldPull;
    if (includeStale) {
      shouldPull = responseCache.has(requestKey, { includeStale: true });
    } else {
      shouldPull = responseCache.isFresh(requestKey);
    }

    if (shouldPull) {
      const cacheObject = responseCacheStore[requestKey];
      cacheObject.accessCount += 1;
      cacheObject.lastAccessedAt = Date.now();

      return generateResponse(cacheObject.res);
    } else {
      return undefined;
    }
  },

  set(requestKey: string, res: BestFetchResponse) {
    responseCacheStore[requestKey] = {
      res,
      createdAt: Date.now(),
      accessCount: 0,
      lastAccessedAt: null,
    };

    return responseCache;
  },

  has(requestKey: string, { includeStale = false } = {}): boolean {
    if (includeStale) {
      // `undefined` is not a valid JSON key, so we can reliably use
      // it to determine if the value exists or not.
      return typeof responseCacheStore[requestKey] !== 'undefined';
    } else {
      return responseCache.isFresh(requestKey);
    }
  },

  delete(requestKey: string): boolean {
    if (!responseCache.has(requestKey, { includeStale: true })) {
      return false;
    } else {
      delete responseCacheStore[requestKey];
      return true;
    }
  },

  clear(): void {
    responseCacheStore = {};
  },

  isFresh(requestKey: string): boolean {
    return !checkStaleness(requestKey);
  },

  purge() {
    for (var requestKey in responseCacheStore) {
      if (!responseCache.isFresh(requestKey)) {
        delete responseCacheStore[requestKey];
      }
    }
  },

  defineStaleness(fn: (cacheObject: CacheObject) => boolean) {
    if (typeof fn === 'function') {
      stalenessDefinitionFn = fn;
    } else {
      throw new TypeError(
        'The first argument to `responseCache.defineStaleness()` must be a function.'
      );
    }
  },

  defineCacheableResponse(fn: (res: ExtendedResponse) => boolean) {
    if (typeof fn === 'function') {
      cacheableResponseFn = fn;
    } else {
      throw new TypeError(
        'The first argument to `responseCache.defineCacheableResponse()` must be a function.'
      );
    }
  },
};

export { responseCache };

export function checkStaleness(
  requestKey: string,
  evictStaleResponses = false
) {
  if (responseCache.has(requestKey, { includeStale: true })) {
    let cacheObject = responseCacheStore[requestKey];
    const isStale = stalenessDefinitionFn(cacheObject);

    if (isStale && evictStaleResponses) {
      responseCache.delete(requestKey);
    }

    return isStale;
  } else {
    return true;
  }
}

export function shouldWriteCachedValue(res: ExtendedResponse) {
  return cacheableResponseFn(res);
}
