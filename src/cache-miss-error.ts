// A CacheMissError represents a cache miss. The Promise returned by a bestfetch call
// will reject to this if you specify `cachePolicy: "cache-only"` and there is nothing
// found in the cache.

interface CacheMissErr {
  new (msg: string): CacheMissErr;
  value: typeof CacheMissError;
  writable: boolean;
  configurable: boolean;
  name: string;
  message: string;
}

interface FooConstructor {
  new (message: string): CacheMissErr;
  prototype: CacheMissErr;
}

const CacheMissError = (function CacheMissError(
  this: CacheMissErr,
  message: string
) {
  var err = Error.call(this, message);
  err.name = this.name = 'CacheMissError';
  this.message = err.message;
} as Function) as FooConstructor;

CacheMissError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: CacheMissError,
    writable: true,
    configurable: true,
  },
});

export default CacheMissError;
