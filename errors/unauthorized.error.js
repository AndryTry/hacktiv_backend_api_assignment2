class UnauthorizedError extends Error {
    constructor(message = "Unauthorized") {
      super(message);
      this.statusCode = 401;
      this.name = "Unauthorized";
    }
  }
  
  module.exports = UnauthorizedError;