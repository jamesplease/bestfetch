# Changelog

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
