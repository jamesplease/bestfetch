import generateResponse from './generate-response';

let responseCacheStore = {};

// By default we always read from the cache when a value exists.
let readPolicyFn = () => true;

// By default server errors are not cached, but every other successful response is.
let writePolicyFn = res => {
  if (res.code >= 500) {
    return false;
  } else {
    return true;
  }
};

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
      delete responseCache[requestKey];
      return true;
    }
  },

  clear() {
    responseCacheStore = {};
  },

  configureCacheReadPolicy(fn) {
    if (typeof fn === 'function') {
      readPolicyFn = fn;
    } else {
      throw new TypeError(
        'The first argument to `responseCache.configureCacheReadPolicy()` must be a function.'
      );
    }
  },

  configureCacheWritePolicy(fn) {
    if (typeof fn === 'function') {
      writePolicyFn = fn;
    } else {
      throw new TypeError(
        'The first argument to `responseCache.configureCacheWritePolicy()` must be a function.'
      );
    }
  },
};

export default responseCache;

export function shouldUseCachedValue(requestKey) {
  if (responseCache.has(requestKey)) {
    let cacheObject = responseCache.get(requestKey);
    const shouldAccess = readPolicyFn(cacheObject);

    if (!shouldAccess) {
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
