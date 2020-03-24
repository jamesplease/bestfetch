import generateResponse from './generate-response';

let responseCacheStore = {};

export const defaultFreshnessDefinition = () => true;
export const defaultWritePolicy = res => {
  if (res.status >= 500) {
    return false;
  } else {
    return true;
  }
};

// By default we always read from the cache when a value exists.
let freshnessDefinitionFn = defaultFreshnessDefinition;

// By default server errors are not cached, but every other successful response is.
let writePolicyFn = defaultWritePolicy;

const responseCache = {
  get(requestKey) {
    if (responseCache.has(requestKey)) {
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

  has(requestKey) {
    // `undefined` is not a valid JSON key, so we can reliably use
    // it to determine if the value exists or not.dfs
    return typeof responseCacheStore[requestKey] !== 'undefined';
  },

  delete(requestKey) {
    if (!responseCache.has(requestKey)) {
      return false;
    } else {
      delete responseCacheStore[requestKey];
      return true;
    }
  },

  clear() {
    responseCacheStore = {};
  },

  isFresh(requestKey, { purgeIfStale = false } = {}) {
    return checkFreshness(requestKey, purgeIfStale);
  },

  defineFreshness(fn) {
    if (typeof fn === 'function') {
      freshnessDefinitionFn = fn;
    } else {
      throw new TypeError(
        'The first argument to `responseCache.defineFreshness()` must be a function.'
      );
    }
  },

  defineCacheableResponse(fn) {
    if (typeof fn === 'function') {
      writePolicyFn = fn;
    } else {
      throw new TypeError(
        'The first argument to `responseCache.defineCacheableResponse()` must be a function.'
      );
    }
  },
};

export default responseCache;

export function checkFreshness(requestKey, purge = false) {
  if (responseCache.has(requestKey)) {
    let cacheObject = responseCacheStore[requestKey];
    const shouldAccess = freshnessDefinitionFn(cacheObject);

    if (!shouldAccess && purge) {
      responseCache.delete(requestKey);
    }

    return shouldAccess;
  } else {
    return false;
  }
}

export function shouldWriteCachedValue(res) {
  return writePolicyFn(res);
}
