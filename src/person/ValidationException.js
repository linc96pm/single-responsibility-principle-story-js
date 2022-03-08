class ValidationException extends Error {
  description;

  constructor(msg, description) {
    super();
    this.message = msg;
    this.description = description;
  }
}

export default ValidationException;
