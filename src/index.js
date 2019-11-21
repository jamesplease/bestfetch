let activeRequests = {};
let responseCache = {};

export function getRequestKey({
  url = '',
  method = '',
  responseType = '',
  body = '',
} = {}) {
  return [url, method.toUpperCase(), responseType, body].join('||');
}

// Returns `true` if a request with `requestKey` is in flight,
// and `false` otherwise.
export function isRequestInFlight(requestKey) {
  return Boolean(activeRequests[requestKey]);
}

export const fetchCache = {
  get(requestKey) {
    return responseCache[requestKey];
  },

  set(requestKey, res) {
    responseCache[requestKey] = res;
    return responseCache[requestKey];
  },

  has(requestKey) {
    // `undefined` is not a valid JSON key, so we can reliably use
    // it to determine if the value exists or not.dfs
    return typeof responseCache[requestKey] !== 'undefined';
  },

  clear() {
    responseCache = {};
  }
}

export function clearActiveRequests() {
  activeRequests = {};
}

// This loops through all of the handlers for the request and either
// resolves or rejects them.
function resolveRequest({ requestKey, res, err }) {
  const handlers = activeRequests[requestKey] || [];

  handlers.forEach(handler => {
    if (res) {
      handler.resolve(res);
    } else {
      handler.reject(err);
    }
  });

  // This list of handlers has been, well, handled. So we
  // clear the handlers for the next request.
  activeRequests[requestKey] = null;
}

function CacheMissError() {
  var err = Error.apply(this, arguments);
  err.name = this.name = 'CacheMissError';
  this.message = err.message;
  this.stack = err.stack;
}

CacheMissError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: CacheMissError,
    writable: true,
    configurable: true,
  },
});

export function fetchDedupe(input, init = {}, dedupeOptions) {
  let opts, initToUse;
  if (dedupeOptions) {
    opts = dedupeOptions;
    initToUse = init;
  } else if (
    init &&
    (init.responseType || init.dedupe || init.cachePolicy || init.requestKey)
  ) {
    opts = init;
    initToUse = {};
  } else {
    opts = {};
    initToUse = init;
  }

  const { requestKey, responseType = '', dedupe = true, cachePolicy } = opts;

  const method = initToUse.method || input.method || '';
  const upperCaseMethod = method.toUpperCase();

  let appliedCachePolicy;
  if (cachePolicy) {
    appliedCachePolicy = cachePolicy;
  } else {
    const isReadRequest =
      upperCaseMethod === 'GET' ||
      upperCaseMethod === 'OPTIONS' ||
      upperCaseMethod === 'HEAD' ||
      upperCaseMethod === '';

    appliedCachePolicy = isReadRequest ? 'cache-first' : 'network-only';
  }
  // Build the default request key if one is not passed
  let requestKeyToUse =
    requestKey ||
    getRequestKey({
      // If `input` is a request, then we use that URL
      url: input.url || input,
      // We prefer values from `init` over request objects. With `fetch()`, init
      // takes priority over a passed-in request
      method: initToUse.method || input.method || '',
      body: initToUse.body || input.body || '',
    });

  let cachedResponse;
  if (appliedCachePolicy !== 'network-only') {
    cachedResponse = responseCache[requestKeyToUse];

    if (cachedResponse) {
      return Promise.resolve(cachedResponse);
    } else if (cachePolicy === 'cache-only') {
      const cacheError = new CacheMissError(
        `Response for fetch request not found in cache.`
      );
      return Promise.reject(cacheError);
    }
  }

  let proxyReq;
  if (dedupe) {
    if (!activeRequests[requestKeyToUse]) {
      activeRequests[requestKeyToUse] = [];
    }

    const handlers = activeRequests[requestKeyToUse];
    const requestInFlight = Boolean(handlers.length);
    const requestHandler = {};
    proxyReq = new Promise((resolve, reject) => {
      requestHandler.resolve = resolve;
      requestHandler.reject = reject;
    });

    handlers.push(requestHandler);

    if (requestInFlight) {
      return proxyReq;
    }
  }

  const request = fetch(input, initToUse).then(
    res => {
      let responseTypeToUse;
      if (responseType instanceof Function) {
        responseTypeToUse = responseType(res);
      } else if (responseType) {
        responseTypeToUse = responseType;
      } else if (res.status === 204) {
        responseTypeToUse = 'text';
      } else {
        responseTypeToUse = 'json';
      }
      // The response body is a ReadableStream. ReadableStreams can only be read a single
      // time, so we must handle that in a central location, here, before resolving
      // the fetch.
      return res[responseTypeToUse]().then(
        data => {
          res.data = data;
          responseCache[requestKeyToUse] = res;

          if (dedupe) {
            resolveRequest({ requestKey: requestKeyToUse, res });
          } else {
            return res;
          }
        },
        () => {
          res.data = null;

          if (dedupe) {
            resolveRequest({ requestKey: requestKeyToUse, res });
          } else {
            return res;
          }
        }
      );
    },
    err => {
      if (dedupe) {
        resolveRequest({ requestKey: requestKeyToUse, err });
      } else {
        return Promise.reject(err);
      }
    }
  );

  if (dedupe) {
    return proxyReq;
  } else {
    return request;
  }
}
