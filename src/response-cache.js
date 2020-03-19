import generateResponse from './generate-response';

let responseCacheStore = {};

let accessFn = () => true;

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

  useCachedResponse(fn) {
    if (typeof fn === 'function') {
      accssFn = fn;
    } else {
      throw new TypeError(
        'The first argument to `responseCache.useCachedResponse()` must be a function.'
      );
    }
  },
};

export default responseCache;

export function shouldUseCachedValue(requestKey) {
  if (responseCache.has(requestKey)) {
    let cacheObject = responseCache.get(requestKey);
    const shouldAccess = accessFn(cacheObject);

    if (!shouldAccess) {
      responseCache.delete(requestKey);
    }

    return shouldAccess;
  } else {
    return false;
  }
}
