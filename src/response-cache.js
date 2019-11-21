let responseCacheStore = {};

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
      timecode: Number(new Date()),
      res
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
};

export default responseCache;