import CacheMissError from './cache-miss-error';
import {
  responseCache,
  checkStaleness,
  shouldWriteCachedValue,
} from './response-cache';
import generateResponse from './generate-response';

export { responseCache, CacheMissError };

interface promiseProxy {
  resolve: (res: any) => void;
  reject: (err: any) => void;
}

interface duplicateRequestStoreInterface {
  [Key: string]: Array<promiseProxy> | null;
  [Key: number]: Array<promiseProxy> | null;
}

let duplicateRequestsStore: duplicateRequestStoreInterface = {};

export function getRequestKey({
  url = '',
  method = '',
  responseType = '',
  body = '',
} = {}): string {
  return [url, method.toUpperCase(), responseType, body].join('||');
}

const duplicateRequests = {
  // Returns `true` if a request with `requestKey` is in flight,
  // and `false` otherwise.
  isRequestInFlight(requestKey: string) {
    const handlers = duplicateRequestsStore[requestKey];
    if (handlers && handlers.length) {
      return Boolean(handlers.length);
    } else {
      return false;
    }
  },

  clear() {
    duplicateRequestsStore = {};
  },
};

export { duplicateRequests };

interface resolveRequestOpts {
  requestKey: string;
  res: any;
  err: any;
}

// This loops through all of the handlers for the request and either
// resolves or rejects them.
function resolveRequest({ requestKey, res, err }: resolveRequestOpts) {
  const handlers = duplicateRequestsStore[requestKey] || [];

  handlers.forEach((handler: promiseProxy) => {
    if (res) {
      handler.resolve(generateResponse(res));
    } else {
      handler.reject(err);
    }
  });

  // This list of handlers has been, well, handled. So we
  // clear the handlers for the next request.
  duplicateRequestsStore[requestKey] = null;
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

    appliedCachePolicy = isReadRequest ? 'cache-first' : 'no-cache';
  }

  const ignoreCacheOnResponse = appliedCachePolicy === 'no-cache';

  // Build the default request key if one is not passed
  let requestKeyToUse =
    requestKey ||
    getRequestKey({
      // If `input` is a Request, then use its URL
      url,
      method: init.method || '',
      body: init.body || '',
    });

  // This is when we check the cache to see if there a response to return
  if (appliedCachePolicy !== 'reload' && appliedCachePolicy !== 'no-cache') {
    // If we have a fresh response then we return it
    if (!checkStaleness(requestKeyToUse, true)) {
      return Promise.resolve(responseCache.get(requestKeyToUse));
    }
    // If there's no cached response, and the cachePolicy is "cache-only", then the Promise rejects
    else if (cachePolicy === 'cache-only') {
      const cacheError = new CacheMissError(
        `Response for fetch request not found in cache.`
      );
      return Promise.reject(cacheError);
    }
  }

  let proxyReq;
  if (dedupe) {
    if (!duplicateRequestsStore[requestKeyToUse]) {
      duplicateRequestsStore[requestKeyToUse] = [];
    }

    const handlers = duplicateRequestsStore[requestKeyToUse] || [];
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

  function onSuccess(res) {
    if (!ignoreCacheOnResponse) {
      if (shouldWriteCachedValue(res)) {
        responseCache.set(requestKeyToUse, res);
      }
    }

    if (dedupe) {
      resolveRequest({ requestKey: requestKeyToUse, res });
    } else {
      return generateResponse(res);
    }
  }

  const request = fetch(url, init).then(
    // This handles receiving a response. This happens when there are successful responses (i.e.; 200 OK),
    // as well as for errors returned by the server (i.e.; 4xx and 5xx errors).
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
        // This handles when the body is parsed successfully.
        data => {
          res.data = data;
          return onSuccess(res);
        },
        // This handles when there is an error parsing the body. We set the
        // `data` to be `null`, but otherwise treat it as a success.
        () => {
          res.data = null;
          return onSuccess(res);
        }
      );
    },
    // This handles when there are network errors. i.e.; the user's device disconnects
    // from the network.
    // Note: this does *not* handle responses from the server, even if that response is an error!
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
