# Changelog

### v3.0.0 (2018/4/12)

**Breaking Changes**

- When an attempt to call `response[responseType]()` errors, then `response.data`
  will be set as `null`. This can be useful if you specify the `responseType` as
  `json`, and the backend returns malformed JSON (such as an empty string or
  plain text). Instead of this error going uncaught, the fetch will work as expected.

### v2.1.1 (2018/3/24)

**Bug Fixes**

* Resolves a problem where you were unable to use the signature `fetch(input, init)`.

### v2.1.0 (2018/2/7)

**New Features**

* `responseType` can now be specified as a function. This is useful for backends that don't
  respect the `Accept` header. "Enterprisey" backends frequently return text stack traces
  for errors, as an example.

### v2.0.0 (2018/2/4)

**Breaking**

* `dedupeOptions` is now optional. The `responseType` is `"json"` by default, unless the
  status code is 204, in which case it will be `"text"`.

### v1.0.0 (2018/2/4)

**New features**

* `init` is now optional
* A `requestKey` will be generated for you if it is omitted

### v0.1.0 (2018/2/4)

This is the first release of the library.
