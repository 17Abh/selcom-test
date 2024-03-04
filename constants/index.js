export const httpStatusCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
  TOO_MANY_REQUESTS: 429,
  CONFLICT: 409,
  UNAUTHORIZED: 401,
  HAS_MFA: 202,
};

export const messages = {
  MISSING_PAYLOAD: "Payload is missing",
  INVALID_TOKEN: "Token is invalid or expired.",
  NO_TOKEN: "No token provided.",
  TOO_MANY_REQUESTS:
    "You have reached the maximum api hit per minute,Please try after some time.",
  MISSING_REQUIRED_FIELDS: "Missing required fields",
  USER_REGISTERED: "Registration Successfully",
  VALIDATION_ERROR: "Payload invalid",
  INVALID_REQUEST: "Invalid request",
  USER_NOT_FOUND: "Unable to find user",
  INTERNAL_SERVER: "unable to connect to server",
  MISSING_TOKEN: "jwt token missing",
};
