class CriticalError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.handled = true;
  }
}

class UnknownError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.handled = true;
  }
}

class MissingTokenError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.handled = true;
  }
}

class MissingDataError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.handled = true;
  }
}

class UnauthorizedServerAccessError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.handled = true;
  }
}

class BadCredentialsError extends Error {
  constructor(optionalMessage) {
    super("Bad credentials. Please Retry." + (optionalMessage || ""));
    this.name = this.constructor.name;
    this.handled = true;
  }
}

class ServerError extends Error {
  constructor(optionalMessage) {
    super("Service temporarily unavailable. Please come back later." + (optionalMessage || ""));
    this.name = this.constructor.name;
    this.handled = true;
  }
}

export { CriticalError, UnknownError, MissingTokenError, MissingDataError, BadCredentialsError, ServerError, UnauthorizedServerAccessError };