let responseCacheStore = {};

let accessFn = () => true;

const responseCache = {
  get(requestKey) {
    if (responseCache.has(requestKey)) {
      return responseCacheStore[requestKey].res;
    } else {
      return undefined;
    }
  },

  set(requestKey, res) {
    responseCacheStore[requestKey] = {
      timestamp: Number(new Date()),
      res,
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

  configureCacheCheck(fn) {
    if (typeof fn === 'function') {
      accssFn = fn;
    } else {
      throw new TypeError(
        'The first argument to `responseCache.configureCacheCheck()` must be a function.'
      );
    }
  },
};

export default responseCache;

export function shouldUseCachedValue(requestKey) {
  if (responseCache.has(requestKey)) {
    let cacheValue = responseCache.get(requestKey);
    const shouldAccess = accessFn(cacheValue.res, cacheValue.timestamp);

    if (!shouldAccess) {
      responseCache.delete(requestKey);
    }

    return shouldAccess;
  } else {
    return false;
  }
}
