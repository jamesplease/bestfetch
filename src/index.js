import CacheMissError from './cache-miss-error';

let requestCache = {};
let responseCache = {};

export function getRequestKey({
  url = '',
  method = '',
  body = '',
} = {}) {
  return [url, method.toUpperCase(), body].join('||');
}

// Returns `true` if a request with `requestKey` is in flight,
// and `false` otherwise.
export function isRequestInFlight(requestKey) {
  return Boolean(requestCache[requestKey]);
}

export function isResponseCached(requestKey) {
  return Boolean(responseCache[requestKey]);
}

export function clearRequestCache() {
  requestCache = {};
}

export function clearResponseCache() {
  responseCache = {};
}

// This loops through all of the handlers for the request and either
// resolves or rejects them.
function resolveRequest({ requestKey, res, err }) {
  const handlers = requestCache[requestKey] || [];

  handlers.forEach(handler => {
    if (res) {
      const clonedRes = new Response(res.body, res);
      handler.resolve(clonedRes);
    } else {
      handler.reject(err);
    }
  });

  // This list of handlers has been, well, handled. So we
  // clear the handlers for the next request.
  requestCache[requestKey] = null;
}

export function fetchDedupe(input, init = {}, dedupeOptions) {
  let opts, initToUse;
  if (dedupeOptions) {
    opts = dedupeOptions;
    initToUse = init;
  } else if (
    init &&
    (init.dedupe || init.cachePolicy || init.requestKey)
  ) {
    opts = init;
    initToUse = {};
  } else {
    opts = {};
    initToUse = init;
  }

  const { requestKey, dedupe = true, cachePolicy } = opts;

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
    if (!requestCache[requestKeyToUse]) {
      requestCache[requestKeyToUse] = [];
    }

    const handlers = requestCache[requestKeyToUse];
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
      responseCache[requestKeyToUse] = res;
      const clonedRes = new Response(res.body, res);

      if (dedupe) {
        resolveRequest({ requestKey: requestKeyToUse, res: clonedRes });
      } else {
        return clonedRes;
      }
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
