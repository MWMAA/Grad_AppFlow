class AppError extends Error {
  isOperational;
  status;
  constructor(public message: string, public statusCode: number) {
    super(message);

    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, undefined);
  }
}

export default AppError;
