const messageList = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

const HttpError = (status, message = messageList[status]) => {
  console.log("HttpError", HttpError);
  const error = new Error(message);
  error.status = status;
  console.log("error.status", error.status);
  return error;
};

module.exports = HttpError;
