import generateResponse from './generate-response';

let responseCacheStore = {};

// By default we always read from the cache when a value exists.
export const defaultStalenessDefinition = () => false;
// By default server errors are not cached, but every other successful response is.
export const defaultCacheableResponse = res => {
  if (res.status >= 500) {
    return false;
  } else {
    return true;
  }
};

let stalenessDefinitionFn = defaultStalenessDefinition;
let cacheableResponseFn = defaultCacheableResponse;

const responseCache = {
  get(requestKey, { includeStale = false } = {}) {
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

  set(requestKey, res) {
    responseCacheStore[requestKey] = {
      res,
      createdAt: Date.now(),
      accessCount: 0,
      lastAccessedAt: null,
    };

    return responseCache;
  },

  has(requestKey, { includeStale = false } = {}) {
    if (includeStale) {
      // `undefined` is not a valid JSON key, so we can reliably use
      // it to determine if the value exists or not.
      return typeof responseCacheStore[requestKey] !== 'undefined';
    } else {
      return responseCache.isFresh(requestKey);
    }
  },

  delete(requestKey) {
    if (!responseCache.has(requestKey, { includeStale: true })) {
      return false;
    } else {
      delete responseCacheStore[requestKey];
      return true;
    }
  },

  clear() {
    responseCacheStore = {};
  },

  isFresh(requestKey) {
    return !checkStaleness(requestKey);
  },

  purge() {
    for (var requestKey in responseCacheStore) {
      if (!responseCache.isFresh(requestKey)) {
        delete responseCacheStore[requestKey];
      }
    }
  },

  defineStaleness(fn) {
    if (typeof fn === 'function') {
      stalenessDefinitionFn = fn;
    } else {
      throw new TypeError(
        'The first argument to `responseCache.defineStaleness()` must be a function.'
      );
    }
  },

  defineCacheableResponse(fn) {
    if (typeof fn === 'function') {
      cacheableResponseFn = fn;
    } else {
      throw new TypeError(
        'The first argument to `responseCache.defineCacheableResponse()` must be a function.'
      );
    }
  },
};

export default responseCache;

export function checkStaleness(requestKey, purge = false) {
  if (responseCache.has(requestKey, { includeStale: true })) {
    let cacheObject = responseCacheStore[requestKey];
    const isStale = stalenessDefinitionFn(cacheObject);

    if (isStale && purge) {
      responseCache.delete(requestKey);
    }

    return isStale;
  } else {
    return true;
  }
}

export function shouldWriteCachedValue(res) {
  return cacheableResponseFn(res);
}
