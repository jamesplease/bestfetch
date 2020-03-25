// A CacheMissError represents a cache miss. The Promise returned by a bestfetch call
// will reject to this if you specify `cachePolicy: "cache-only"` and there is nothing
// found in the cache.
// It is implemented as an ES5-compatible custom error. For more on this strategy, see:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#ES5_Custom_Error_Object
export default function CacheMissError() {
  var err = Error.apply(this, arguments);
  err.name = this.name = 'CacheMissError';
  this.message = err.message;
  this.stack = err.stack;
}

CacheMissError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: CacheMissError,
    writable: true,
    configurable: true,
  },
});
