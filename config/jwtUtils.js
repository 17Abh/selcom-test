import jwt from "jsonwebtoken";
import { httpStatusCode, messages } from "../constants/index.js";
import { UserModel } from "../models/user.model.js";

const PREFIX = "USER | TOKEN | VERIFICATION | ";

// JWT key
const jwtKey = process.env.JWT_KEY ?? "test";

/**
 * Function to generate a jwt token for a user
 * @param userDetails , user details to generate a token
 * @returns a valid token for user authorization
 */
export const generateAuthToken = (userDetails) => {
  const options = {
    expiresIn: 60 * 60 * 24 * 31 * 2,
  };

  return jwt.sign(userDetails, jwtKey, options);
};

/**
 * Function to verify a jwt token
 * @param token , token to verify
 * @returns Promise details of the user appended to the request
 */
export const verifyToken = async (req, res, next) => {
  // Get token from header
  const token = req.header("Authorization");

  // Check if token is not present
  if (!token) {
    console.log(`${PREFIX}, ${messages.MISSING_TOKEN}`);
    return res.status(httpStatusCode.UNAUTHORIZED).send({
      message: messages.MISSING_TOKEN,
    });
  }

  try {
    // Verify token
    const decoded = await jwt.verify(token, jwtKey);
    // check user details in database
    const user = await UserModel.findOne({ _id: decoded.id });
    if (!user) {
      console.log(`${PREFIX}, failed with error ${messages.INVALID_TOKEN}`);
      return res.status(httpStatusCode.UNAUTHORIZED).send({
        message: messages.INVALID_TOKEN,
      });
    }

    // Append user details to request
    req.user = {
      id: user._id,
      email: user.email,
    };
    next();
  } catch (error) {
    console.log(`${PREFIX} Error in verifying token. with error: ${error}`);
    return res.status(httpStatusCode.UNAUTHORIZED).send({
      message: messages.INVALID_TOKEN,
    });
  }
};
