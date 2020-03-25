// A CacheMissError represents a cache miss. The Promise returned by a bestfetch call
// will reject to this if you specify `cachePolicy: "cache-only"` and there is nothing
// found in the cache.
export default class CacheMissError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = CacheMissError.name;
  }
}
