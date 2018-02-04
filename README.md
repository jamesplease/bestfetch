# Fetch Dedupe

[![Travis build status](http://img.shields.io/travis/jmeas/fetch-dedupe.svg?style=flat)](https://travis-ci.org/jmeas/fetch-dedupe)
[![npm version](https://img.shields.io/npm/v/fetch-dedupe.svg)](https://www.npmjs.com/package/fetch-dedupe)
[![Test Coverage](https://codeclimate.com/github/jmeas/fetch-dedupe/badges/coverage.svg)](https://codeclimate.com/github/jmeas/fetch-dedupe)
[![gzip size](http://img.badgesize.io/https://unpkg.com/fetch-dedupe/dist/fetch-dedupe.min.js?compression=gzip)](https://unpkg.com/fetch-dedupe/dist/fetch-dedupe.min.js)

A (very) thin wrapper around
[`global.fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
that prevents duplicate requests.

### Motivation

A common feature of libraries or frameworks that build abstractions around HTTP requests is that
they deduplicate requests that are exactly the same. This library extracts that functionality.

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

This example demonstrates using fetch-dedupe with the
[ES2015 module syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).

```js
import { getRequestKey, fetchDedupe } from 'fetch-dedupe';

const url = '/test/2';
const fetchOptions = {
  method: 'GET',
  body: JSON.stringify({ a: 12 })
};

// First, build a request key. A request key is a unique string
// that identifies the request.
// `getRequestKey` is a built-in key generator that will work for
// most situations, although you can make your own.
const requestKey = getRequestKey({
  url,
  ...fetchOptions
});

// The API of `fetchDedupe` is the same as fetch, except that it
// has an additional argument. Pass the `requestKey` in that
// third argument
fetchDedupe(url, fetchOptions, {
  requestKey,
  responseType: 'json'
}).then(res => {
  console.log('Got some data', res.data);
});

// Additional requests are deduped. Nifty.
fetchDedupe(url, fetchOptions, {
  requestKey,
  responseType: 'json'
}).then(res => {
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
fetchDedupe(url, init, dedupeOptions)
  .then(res =>
    console.log('got some cool data', res.data)
  );

// Don't do this! It will throw an error.
fetchDedupe(url, init, dedupeOptions)
  .then(res => res.json())
  .then(data => console.log('got some cool data', data));
```

### API

This library exports the following methods:

- `fetchDedupe()`
- `getRequestKey()`
- `isRequestInFlight()`
- `clearRequestCache()`

##### `fetchDedupe( input, init, dedupeOptions )`

A wrapper around `global.fetch()`. The first two arguments are the same ones that you're used to.
Refer to
[the fetch() documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch)
for more.

The third option is `dedupeOptions`. This is an object with three attributes:

* `requestKey`: A string that is used to determine if two requests are identical. Required.
* `responseType`: Any of the methods from [the Body mixin](https://developer.mozilla.org/en-US/docs/Web/API/Body).
  Typically, you will want to use `json`. Required.
* `dedupe`: Whether or not to dedupe the request. Pass `false` and it will be as if this library
  was not even being used. Defaults to `true`.

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
```

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

##### `clearRequestCache()`

Wipe the cache of in-flight requests.

> Warning: this is **not** safe to use in application code. It is mostly useful for testing.

### FAQ & Troubleshooting

##### An empty response is throwing an error, what gives?

Empty text strings are not valid JSON.

```js
JSON.parse('');
// > Uncaught SyntaxError: Unexpected end of JSON input
```

Consequently, using `json` as the `responseType` when a response's body is empty will cause an
Error to be thrown. To avoid this, we recommend using `text` instead.

APIs generally use empty bodies in conjunction with a 204 status code for responses
of "write" requests (deletes, updates, and less commonly creates).

##### Why is `responseType` required?

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
