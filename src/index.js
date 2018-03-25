// This is a cache of in-flight requests. Each request key maps to an
// array of Promises. When the request resolves, each promise in the
// array is pushed to.
let requests = {};

export function getRequestKey({
  url = '',
  method = '',
  responseType = '',
  body = ''
} = {}) {
  return [url, method.toUpperCase(), responseType, body].join('||');
}

// Returns `true` if a request with `requestKey` is in flight,
// and `false` otherwise.
export function isRequestInFlight(requestKey) {
  return Boolean(requests[requestKey]);
}

export function clearRequestCache() {
  requests = {};
}

// This loops through all of the handlers for the request and either
// resolves or rejects them.
function resolveRequest({ requestKey, res, err }) {
  const handlers = requests[requestKey] || [];

  handlers.forEach(handler => {
    if (res) {
      handler.resolve(res);
    } else {
      handler.reject(err);
    }
  });

  // This list of handlers has been, well, handled. So we
  // clear the handlers for the next request.
  requests[requestKey] = null;
}

export function fetchDedupe(input, init = {}, dedupeOptions) {
  let opts, initToUse;
  if (dedupeOptions) {
    opts = dedupeOptions;
    initToUse = init;
  } else if (init.responseType) {
    opts = init;
    initToUse = {};
  } else {
    opts = {};
    initToUse = init;
  }

  const { requestKey, responseType = '', dedupe = true } = opts;

  // Build the default request key if one is not passed
  let requestKeyToUse =
    requestKey ||
    getRequestKey({
      // If `input` is a request, then we use that URL
      url: input.url || input,
      // We prefer values from `init` over request objects. With `fetch()`, init
      // takes priority over a passed-in request
      method: initToUse.method || input.method || '',
      body: initToUse.body || input.body || ''
    });

  let proxyReq;
  if (dedupe) {
    if (!requests[requestKeyToUse]) {
      requests[requestKeyToUse] = [];
    }

    const handlers = requests[requestKeyToUse];
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
      return res[responseTypeToUse]().then(data => {
        res.data = data;

        if (dedupe) {
          resolveRequest({ requestKey: requestKeyToUse, res });
        } else {
          return res;
        }
      });
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
