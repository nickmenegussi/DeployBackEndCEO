export default function appError(message, statusCode = 400) {
  return {
    message,
    statusCode,
  };
}
