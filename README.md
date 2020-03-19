# bestfetch

[![Travis build status](http://img.shields.io/travis/jamesplease/bestfetch.svg?style=flat)](https://travis-ci.org/jamesplease/bestfetch)
[![npm version](https://img.shields.io/npm/v/bestfetch.svg)](https://www.npmjs.com/package/bestfetch)
[![Test Coverage](https://coveralls.io/repos/github/jamesplease/bestfetch/badge.svg?branch=master)](https://coveralls.io/github/jamesplease/bestfetch?branch=master)
[![gzip size](http://img.badgesize.io/https://unpkg.com/bestfetch/lib/index.js?compression=gzip)](https://unpkg.com/bestfetch/lib/index.js)

A [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)-like HTTP library that
implements request deduplication and response caching.

## Motivation

Making a single HTTP request is not difficult to do in JavaScript. However, complex web applications often make many
requests as the user navigates through the app.

Features such as request deduplication and response caching can often save the developer of apps like these from headache and
bugs.

`bestfetch` is a library with a familiar, fetch-like API, and it includes request deduplication and response caching. Plus,
it's a delight to use.

## Installation

Install using [npm](https://www.npmjs.com):

```
npm install bestfetch
```

or [yarn](https://yarnpkg.com/):

```
yarn add bestfetch
```

## Getting Started

Because `bestfetch` is such a lightweight wrapper around `fetch`, you'll benefit from having knowledge of that API.
If you're new to fetch, I recommend reading the [Using Fetch guide on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).
It's a great introduction.

The following example demonstrates using bestfetch with the
[ES2015 module syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).

```js
import { bestfetch } from 'bestfetch';

const fetchOptions = {
  method: 'PATCH',
  body: JSON.stringify({ a: 12 })
};

bestfetch('/test/2', fetchOptions)
  .then(res => {
    console.log('Got some data', res.data);
  });

// Additional identical requests are deduped. Nifty.
bestfetch('/test/2', fetchOptions)
  .then(res => {
    console.log('Got some data', res.data);
  });
```

## API

This library exports the following:

- [`bestfetch()`](https://github.com/jamesplease/bestfetch#bestfetch-url--options-)
- [`getRequestKey()`](https://github.com/jamesplease/bestfetch#getrequestkey-url-method-responsetype-body-)
- [`responseCache`](https://github.com/jamesplease/bestfetch#responsecache)
  - [`.get()`](https://github.com/jamesplease/bestfetch#responsecacheget-requestkey-)
  - [`.set()`](https://github.com/jamesplease/bestfetch#responsecacheset-requestkey-res-)
  - [`.has()`](https://github.com/jamesplease/bestfetch#responsecachehas-requestkey-)
  - [`.delete()`](https://github.com/jamesplease/bestfetch#responsecachedelete-requestkey-)
  - [`.clear()`](https://github.com/jamesplease/bestfetch#responsecacheclear)
  - [`.useCachedResponse()`](https://github.com/jamesplease/bestfetch#responsecacheusecachedresponse-fn-)
- [`activeRequests`](https://github.com/jamesplease/bestfetch#activerequests)
  - [`isRequestInFlight()`](https://github.com/jamesplease/bestfetch#activerequestsisrequestinflight-requestkey-)
  - [`clear()`](https://github.com/jamesplease/bestfetch#activerequestsclear)
- [`CacheMissError`](https://github.com/jamesplease/bestfetch#cachemisserror)

##### `bestfetch( [url] [, options] )`

Creates an HTTP request. You may pass a URL as the first argument to make a basic GET request:

```js
fetch('/api/books/2')
```

If you need to configure the request with more details, you can pass a second argument, `options`:

```js
fetch('/api/books/2', {
  method: 'POST'
});
```

You may also only pass options, including the URL as part of the options, if you'd prefer:

```js
fetch({
  url: '/api/books/2',
  method: 'POST'
});
```

In addition to all of the [options supported by fetch's init](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch),
this library supports a few more options:

* `responseType` *(String|Function)*: Any of the methods from [the Body mixin](https://developer.mozilla.org/en-US/docs/Web/API/Body).
  The default is `"json"`, unless the response status code is `"204"`, in which case `"text"` will be used.

  If a function is passed, then it will be passed the `response` object. This lets you dynamically determine the
  response type based on information about the response, such as the status code.

* `dedupe` *(Boolean)*: Whether or not to dedupe the request. Pass `false` and it will be as if this library
  was not even being used. Defaults to `true`.

* `cachePolicy` *(String)*: Determines interactions with the cache. Valid options are `"cache-first"`, `"cache-only"`,
  and `"network-only"`. For more, refer to [the section on Caching](https://github.com/jamesplease/bestfetch#caching).

* `requestKey` *(String)*: You will not typically need to specify this option. `requestKey` is a string that is used to determine if two
  requests are identical. You may pass this to configure how the request key is generated. A default key is generated for you if this is
  omitted. For most use cases, the default key is sufficient.

Let's run through valid calls to `bestfetch`:

```js
import { bestfetch } from 'bestfetch';

bestfetch('/test/2');

bestfetch('/test/2', {
  method: 'DELETE'
});

bestfetch('/test/2', {
  method: 'PATCH',
  body: JSON.stringify({value: true}),
  credentials: 'include',
  responseType: 'json',
  dedupe: false,
  cachePolicy: 'network-only'
});
```

##### `getRequestKey({ url, method, responseType, body })`

Returns a unique request key based on the passed-in values. All of the values,
including `body`, must be strings.

Every value is optional, but the deduplication logic is improved by adding the
most information that you can.

> Note: The `method` option is case-insensitive.

> Note: You do not need to use this method to generate a request key. You can generate the key
  in whatever way that you want. This should work for most use cases, though.

```js
import { getRequestKey } from 'bestfetch';

const keyOne = getRequestKey({
  url: '/books/2',
  method: 'get'
});

const keyTwo = getRequestKey({
  url: '/books/2',
  method: 'patch',
  body: JSON.stringify({
    title: 'My Name is Red'
  })
});

keyOne === keyTwo;
// => false
```

##### `responseCache`

An interface for the response cache.

```js
import { responseCache } from 'bestfetch';
```

##### `responseCache.get( requestKey )`

Returns the cached response for `requestKey`. If the response does not exist, then `undefined`
will be returned instead.

##### `responseCache.set( requestKey, res )`

Call this to manually update the cached value of `requestKey` with `res`. Returns the `responseCache`.

> Note: this is an advanced method, and you generally do not need to manually update the store.

##### `responseCache.has( requestKey )`

Pass in a `requestKey` to see if there is a cache entry for the request. This can be used
to determine if a call to `bestfetch` will hit the cache or not.

##### `responseCache.delete( requestKey )`

Deletes the cached value associated with `requestKey`. Returns `false` if the value did not
exist in the cache, or `true` if it existed and has been deleted.

##### `responseCache.clear()`

Remove all responses from the cache.

##### `responseCache.useCachedResponse( fn )`

By default, bestfetch caches responses indefinitely. You can customize this behavior using this method.

This method accepts a single argument, `fn,` which is a function. `fn` will be called any time
that a request is made that has a cached response. It's called with a single argument, `cacheObject`, an object
with the following properties:

- `res`: The cached response object.
- `createdAt`: A timestamp (in milliseconds) when the value was added to the cache.
- `lastAccessedAt`: A timestamp (in milliseconds) when the value was last read from the cache.
- `accessCount`: An integer representing the number of times that the value has been read from the cache.

Return `true` to use the cached response, or `false` to remove the value from the cache and make a network request
instead.

For instance, to invalidate cached responses that are more than 10 minutes old:

```js
import { responseCache } from 'bestfetch';

// 1000 = 1 second in milliseconds
// * 60 = 1 minute
// * 10 = 10 minutes
const TEN_MINUTES = 1000 * 60 * 10;

responseCache.useCachedResponse(({ createdAt }) => {
  const currentTimestamp = Date.now();
  return currentTimestamp - createdAt <= TEN_MINUTES;
});
```

##### `activeRequests`

An interface for in-flight requests. This interface powers the request deduplication system.

##### `activeRequests.isRequestInFlight( requestKey )`

Pass in a `requestKey` to see if there's already a request in flight for it. This
can be used to determine if a call to `bestfetch()` will actually hit the network
or not.

```js
import { activeRequests, getRequestKey } from 'bestfetch';

const key = getRequestKey({
  url: '/books/2',
  method: 'get'
});

// Is there already a request in flight for this?
const readingBooksAlready = activeRequests(key);
```

##### `activeRequests.clear()`

Removes all of the tracked in-flight requests. In-flight requests are not cancelled: calling this
method only ensures that subsequent identical requests are not deduped.

> Note: you typically should not need to use this method.

##### `CacheMissError`

A call to `bestfetch` will reject to this value if you specify a `cachePolicy` of `cache-only`,
and there is no cached response in the store.

The Promise only rejects to this whith a `cache-only` cache policy, because any other policy
would make a network request if the value isn't found.

```js
import { CacheMissError } from 'bestfetch';

fetch('/api/books/23', {
  cachePolicy: 'cache-only'
}).then(
  () => console.log('Succeeded'),
  (err) => {
    if (typeof err === CacheMissError) {
      console.log('This request did not having an associated response in the store');
    }
  } 
)
```

## Guides

### Caching

Any time tbat a response from the server is received, it will be cached using the request's request key.
Subsequent requests are matched with existing cached server responses using their request key.

Interactions with the cache can be controlled with the `cachePolicy` option. There are three possible
values:

**`cache-first`**

This is the default behavior.

Requests will first look at the cache to see if a response for the same request key exists. If a response is
found, then it will be returned, and no network request will be made.

If no response exists in the cache, then a network request will be made.

**`network-only`**

The cache is ignored, and a network request is always made.

**`cache-only`**

If a response exists in the cache, then it will be returned. If no response
exists in the cache, then an error will be passed into the render prop function.

## FAQ & Troubleshooting

#### Why is `response.data` set to `null` sometimes?

If the response cannot be parsed as the `responseType`, then it will be set as `null`.

There are two common situations for this:

- The response body is an empty string when you specify `responseType: 'json'`

- The response body is a raw text string when you specify `responseType: 'json'` (i.e.; invalid JSON)

You can use the `responseType` option to have fine-grained control over the parsing of the
response body from the server.

#### Why is `responseType` even an option?

The argument that is returned to you in the `.then` callback of a call to `fetch()` is a
[Response object](https://developer.mozilla.org/en-US/docs/Web/API/Response). The body of a Response
object can only be read a single time, because it is a
[ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream).

For bestfetch to work, it must pass the result of a single request to many "consumers." The
only way for this to work is if the library reads it for you, which requires that the library
know what its content type is.

#### What request body types are supported?

Just strings for now, which should work for the majority of APIs. Support for other body types
is in the works.

#### Is the data duplicated?

Although you receive a new `Response` object with every call to `bestfetch`, the body will be read,
so the response's body stream will be empty. In addition, the `data` property between every
`response` is shared. Accordingly, the data returned by the server is never duplicated.

This is an optimization that allows `bestfetch` to be used in applications that fetch
large payloads.

## Requirements

- a global [fetch()](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) method. If your browser does not support it, then we
  recommend GitHub's [fetch polyfill](https://github.com/github/fetch).

> Note: Node users can try and use [node-fetch](https://github.com/bitinn/node-fetch), although we aren't currently targeting Node support with this
> library.

## Acknowledgements

[Apollo](https://www.apollographql.com/) inspired me to write this library.
