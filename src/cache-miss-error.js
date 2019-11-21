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