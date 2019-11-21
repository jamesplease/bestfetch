# Fetch Dedupe

[![Travis build status](http://img.shields.io/travis/jamesplease/fetch-dedupe.svg?style=flat)](https://travis-ci.org/jamesplease/fetch-dedupe)
[![npm version](https://img.shields.io/npm/v/fetch-dedupe.svg)](https://www.npmjs.com/package/fetch-dedupe)
[![Test Coverage](https://codeclimate.com/github/jamesplease/fetch-dedupe/badges/coverage.svg)](https://codeclimate.com/github/jamesplease/fetch-dedupe)
[![gzip size](http://img.badgesize.io/https://unpkg.com/fetch-dedupe/dist/fetch-dedupe.min.js?compression=gzip)](https://unpkg.com/fetch-dedupe/dist/fetch-dedupe.min.js)


A thin wrapper around
[`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
that implements request deduplication and response caching.

### Motivation

Making a single HTTP request is not difficult to do in JavaScript. However, complex web applications often make many
requests as the user navigates through the app.

Features such as request deduplication and response caching can often save the developer of apps like these from headache and
bugs.

`fetch-dedupe` is a wrapper around fetch that includes request deduplication and response caching for you, and it's a delight
to use.

### Installation

Install using [npm](https://www.npmjs.com):

```
npm install fetch-dedupe
```

or [yarn](https://yarnpkg.com/):

```
yarn add fetch-dedupe
```

### Getting Started

This example demonstrates using Fetch Dedupe with the
[ES2015 module syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).

```js
import { fetchDedupe } from 'fetch-dedupe';

const fetchOptions = {
  method: 'PATCH',
  body: JSON.stringify({ a: 12 })
};

// The API of `fetchDedupe` is the same as fetch, except that it
// has an additional argument. Pass the `requestKey` in that
// third argument
fetchDedupe('/test/2', fetchOptions).then(res => {
  console.log('Got some data', res.data);
});

// Additional requests are deduped. Nifty.
fetchDedupe('/test/2', fetchOptions).then(res => {
  console.log('Got some data', res.data);
});
```

#### Important: Read this!

When using `fetch`, you typically read the body yourself by calling, say, `.json()` on the
response. Fetch Dedupe reads the body for you, so you **cannot** do it, or else an error
will be thrown.

```js
// Normal usage of `fetch`:
fetch(url, init)
  .then(res => res.json())
  .then(data => console.log('got some cool data', data));

// The same code using `fetchDedupe`:
fetchDedupe(url, init)
  .then(res =>
    console.log('got some cool data', res.data)
  );

// Don't do this! It will throw an error.
fetchDedupe(url, init)
  .then(res => res.json())
  .then(data => console.log('got some cool data', data));
```

### API

This library exports the following methods:

- `fetchDedupe()`
- `getRequestKey()`
- `responseCache`
  - `.get()`
  - `.set()`
  - `.has()`
  - `.clear()`
- `isRequestInFlight()`
- `clearActiveRequests()`

##### `fetchDedupe( input [, init] [, dedupeOptions] )`

A wrapper around `global.fetch()`. The first two arguments are the same ones that you're used to.
Refer to
[the fetch() documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch)
for more.

Note that `init` is optional, as with `global.fetch()`.

The third option is `dedupeOptions`, and it is also optional. This is an object with three attributes:

* `responseType` *(String|Function)*: Any of the methods from [the Body mixin](https://developer.mozilla.org/en-US/docs/Web/API/Body).
  The default is `"json"`, unless the response status code is `"204"`, in which case `"text"` will be used.

  If a function is passed, then it will be passed the `response` object. This lets you dynamically determine the
  response type based on information about the response, such as the status code.

* `requestKey` *(String)*: A string that is used to determine if two requests are identical. You may pass this
  to configure how the request key is generated. A default key will be generated for you if this is
  omitted.

* `dedupe` *(Boolean)*: Whether or not to dedupe the request. Pass `false` and it will be as if this library
  was not even being used. Defaults to `true`.

* `cachePolicy` *(String)*: Determines interactions with the cache. Valid options are `"cache-first"`, `"cache-only"`,
  and `"network-only"`. For more, refer to the section on Caching.

Given the two possible value types of `input`,  optional second argument, there are a way few ways that you can
call `fetchDedupe`. Let's run through valid calls to `fetchDedupe`:

```js
import { fetchDedupe } from 'fetch-dedupe';

// Omitting everything except for the URL
fetchDedupe('/test/2');

// Just a URL and some init option
fetchDedupe('/test/2', {
  method: 'DELETE'
});

// Omitting `init` and using a URL string as `input`
fetchDedupe('/test/2', {responseType: 'json'});

// Using a URL string as `input`, with numerous `init` configurations
// and specifying several `dedupeOptions`
fetchDedupe('/test/2', {
  method: 'PATCH',
  body: JSON.stringify({value: true}),
  credentials: 'include'
}, {
  responseType: 'json',
  requestKey: generateCustomKey(opts),
  dedupe: false
})

// Omitting `init` and using a Request as `input`
const req = new Request('/test/2');
fetchDedupe(req, {responseType: 'json'});

// Request as `input` with an `init` object. Note that the `init`
// object takes precedence over the Request values.
fetchDedupe(req, {method: 'PATCH'}, {responseType: 'json'});
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
import { getRequestKey } from 'fetch-dedupe';

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

##### `responseCache.get( requestKey )`

Returns the cached response for `requestKey`. If the response does not exist, then `undefined`
will be returned instead.

##### `responseCache.set( requestKey, res )`

Call this to manually update the cached value of `requestKey` with `res`. Returns the `responseCache`.

> Note: this is an advanced method, and you generally do not need to manually update the store.

##### `responseCache.has( requestKey )`

Pass in a `requestKey` to see if there is a cache entry for the request. This can be used
to determine if a call to `fetchDedupe` will hit the cache or not.

##### `responseCache.delete( requestKey )`

Deletes the cached value associated with `requestKey`. Returns `false` if the value did not
exist in the cache, or `true` if it existed and has been deleted.

##### `responseCache.clear()`

Remove all responses from the cache.

##### `isRequestInFlight( requestKey )`

Pass in a `requestKey` to see if there's already a request in flight for it. This
can be used to determine if a call to `fetchDedupe()` will actually hit the network
or not.

```js
import { isRequestInFlight, getRequestKey } from 'fetch-dedupe';

const key = getRequestKey({
  url: '/books/2',
  method: 'get'
});

// Is there already a request in flight for this?
const readingBooksAlready = isRequestInFlight(key);
```

> Now: We **strongly** recommend that you manually pass in `requestKey` to `fetchDedupe`
  if you intend to use this method. In other words, _do not_ rely on being able to
  reliably reproduce the request key that is created when a `requestKey` is not passed in.

##### `clearActiveRequests()`

Removes all of the tracked in-flight requests.

### Guides

##### Caching

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

### FAQ & Troubleshooting

##### Why is `response.data` set to `null` sometimes?

If the response cannot be parsed as the `responseType`, then it will be set as `null`.

There are two common situations for this:

- The response body is an empty string when you specify `responseType: 'json'`

- The response body is a raw text string when you specify `responseType: 'json'` (i.e.; invalid JSON)

You can use the `responseType` option to have fine-grained control over the parsing of the
response body from the server.

##### Why is `responseType` even an option?

The argument that is returned to you in the `.then` callback of a call to `fetch()` is a
[Response object](https://developer.mozilla.org/en-US/docs/Web/API/Response). The body of a Response
object can only be read a single time, because it is a
[ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream).

For Fetch Dedupe to work, it must pass the result of a single request to many "consumers." The
only way for this to work is if the library reads it for you, which requires that the library
know what its content type is.

##### What request body types are supported?

Just strings for now, which should work for the majority of APIs. Support for other body types
is in the works.

##### Is the data duplicated?

Although you receive a new `Response` object with every call to `fetch-dedupe`, the body will be read,
so the response's body stream will be empty. In addition, the `data` property between every
`response` is shared. Accordingly, the data returned by the server is never duplicated.

This is an optimization that allows `fetch-dedupe` to be used in applications that fetch
large payloads.

### Requirements

- a global [fetch()](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) method. If your browser does not support it, then we
  recommend GitHub's [fetch polyfill](https://github.com/github/fetch).

> Note: Node users can try and use [node-fetch](https://github.com/bitinn/node-fetch), although we aren't currently targeting Node support with this
> library.

### Implementors

These are projects that build abstractions around HTTP requests using Fetch Dedupe under the hood.

- [React Request](https://github.com/jamesplease/react-request)

Are you using it on a project? Add it to this list by opening a Pull Request

### Acknowledgements

[Apollo](https://www.apollographql.com/) inspired me to write this library.
