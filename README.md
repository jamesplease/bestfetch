# Fetch Dedupe

[![Travis build status](http://img.shields.io/travis/jmeas/fetch-dedupe.svg?style=flat)](https://travis-ci.org/jmeas/fetch-dedupe)
[![npm version](https://img.shields.io/npm/v/fetch-dedupe.svg)](https://www.npmjs.com/package/fetch-dedupe)
[![Test Coverage](https://codeclimate.com/github/jmeas/fetch-dedupe/badges/coverage.svg)](https://codeclimate.com/github/jmeas/fetch-dedupe)
[![gzip size](http://img.badgesize.io/https://unpkg.com/fetch-dedupe/dist/fetch-dedupe.min.js?compression=gzip)](https://unpkg.com/fetch-dedupe/dist/fetch-dedupe.min.js)

A (very) thin wrapper around
[`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
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
- `isRequestInFlight()`
- `clearRequestCache()`

##### `fetchDedupe( input [, init] [, dedupeOptions] )`

A wrapper around `global.fetch()`. The first two arguments are the same ones that you're used to.
Refer to
[the fetch() documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch)
for more.

Note that `init` is optional, as with `global.fetch()`.

The third option is `dedupeOptions`, and it is also optional. This is an object with three attributes:

* `responseType` *(String|Function)*: Any of the methods from [the Body mixin](https://developer.mozilla.org/en-US/docs/Web/API/Body).
  The default is `"json"`, unless the response status code is `"204"`, in which case `"text"` will be used to prevent
  an error.

  If a function is passed, then it will be passed the `response` object. This lets you dynamically determine the
  response type based on information about the response, such as the status code.

* `requestKey` *(String)*: A string that is used to determine if two requests are identical. You may pass this
  to configure how the request key is generated. A default key will be generated for you if this is
  omitted.

* `dedupe` *(Boolean)*: Whether or not to dedupe the request. Pass `false` and it will be as if this library
  was not even being used. Defaults to `true`.

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

##### `clearRequestCache()`

Wipe the cache of in-flight requests.

> Warning: this is **not** safe to use in application code. It is mostly useful for testing.

### FAQ & Troubleshooting

##### An empty response body is throwing an error, what gives?

Empty text strings are not valid JSON.

```js
JSON.parse('');
// > Uncaught SyntaxError: Unexpected end of JSON input
```

Consequently, using `json` as the `responseType` when a response's body is empty will cause an
Error to be thrown. To avoid this, we recommend using `text` in these situations instead.

APIs generally use empty bodies in conjunction with a 204 status code for responses
of "write" requests (deletes, updates, and less commonly creates). For this reason, the default
behavior of `responseType` is `"json"` except in situations when a 204 code is returned, in which
case `"text"` will be used instead.

If your API returns empty bodies with other codes, then you have two options. The first is to
pass a function as `responseType`. This lets you specify the `responseType` based on the `response`.

For instance, if your backend returns JSON for successful responses, but text stack traces otherwise,
then you might do:

```js
const dedupeOptions = {
  responseType(response) {
    // 204 status code = no body, so treat it as text
    // >= 400 status codes = stack traces, so also treat them as text
    return (response.ok || response.status !== 204) ? 'json' : 'text';
  }
}
```

If your API is exceptionally unreliable, then you can always specify the `responseType` as `"text"`
and try/catch the `JSON.parse` in your application code.

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

### Implementors

These are projects that build abstractions around HTTP requests using Fetch Dedupe under the hood.

- [React Request](https://github.com/jmeas/react-request)

Are you using it on a project? Add it to this list by opening a Pull Request

### Acknowledgements

[Apollo](https://www.apollographql.com/) inspired me to write this library.
