export default class DefaultError extends Error {
  constructor (message, status=500) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.status = status;
  }
}