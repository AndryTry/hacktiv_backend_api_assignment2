class NotFoundError extends Error {
    constructor(message = "Data not found") {
      super(message);
      this.statusCode = 404;
      this.name = "NotFoundError";
    }
  }
  
  module.exports = NotFoundError;