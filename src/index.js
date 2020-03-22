import CacheMissError from './cache-miss-error';
import responseCache, {
  shouldUseCachedValue,
  shouldWriteCachedValue,
} from './response-cache';
import generateResponse from './generate-response';

export { responseCache, CacheMissError };

let activeRequestsStore = {};

export function getRequestKey({
  url = '',
  method = '',
  responseType = '',
  body = '',
} = {}) {
  return [url, method.toUpperCase(), responseType, body].join('||');
}

const activeRequests = {
  // Returns `true` if a request with `requestKey` is in flight,
  // and `false` otherwise.
  isRequestInFlight(requestKey) {
    const handlers = activeRequestsStore[requestKey];
    if (handlers && handlers.length) {
      return Boolean(handlers.length);
    } else {
      return false;
    }
  },

  clear() {
    activeRequestsStore = {};
  },
};

export { activeRequests };

// This loops through all of the handlers for the request and either
// resolves or rejects them.
function resolveRequest({ requestKey, res, err }) {
  const handlers = activeRequestsStore[requestKey] || [];

  handlers.forEach(handler => {
    if (res) {
      handler.resolve(generateResponse(res));
    } else {
      handler.reject(err);
    }
  });

  // This list of handlers has been, well, handled. So we
  // clear the handlers for the next request.
  activeRequestsStore[requestKey] = null;
}

export function bestfetch(input, options) {
  let url;
  let opts;
  if (typeof input === 'string') {
    url = input;
    opts = options || {};
  } else if (typeof input === 'object') {
    opts = input || {};
    url = opts.url;
  }

  const {
    requestKey,
    responseType = '',
    dedupe = true,
    saveToCache,
    cachePolicy,
    ...init
  } = opts;

  const method = init.method || '';
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
      url,
      method: init.method || '',
      body: init.body || '',
    });

  if (appliedCachePolicy !== 'network-only') {
    if (shouldUseCachedValue(requestKeyToUse)) {
      return Promise.resolve(responseCache.get(requestKeyToUse));
    } else if (cachePolicy === 'cache-only') {
      const cacheError = new CacheMissError(
        `Response for fetch request not found in cache.`
      );
      return Promise.reject(cacheError);
    }
  }

  let proxyReq;
  if (dedupe) {
    if (!activeRequestsStore[requestKeyToUse]) {
      activeRequestsStore[requestKeyToUse] = [];
    }

    const handlers = activeRequestsStore[requestKeyToUse];
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

  const request = fetch(url, init).then(
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
          let willWriteToCache;
          if (typeof saveToCache === 'boolean') {
            willWriteToCache = saveToCache;
          } else {
            willWriteToCache = shouldWriteCachedValue(res);
          }

          res.data = data;
          if (willWriteToCache) {
            responseCache.set(requestKeyToUse, res);
          }

          if (dedupe) {
            resolveRequest({ requestKey: requestKeyToUse, res });
          } else {
            return generateResponse(res);
          }
        },
        () => {
          res.data = null;

          if (dedupe) {
            resolveRequest({ requestKey: requestKeyToUse, res });
          } else {
            return generateResponse(res);
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
