import { generateAuthToken } from "../../config/jwtUtils.js";
import { httpStatusCode, messages } from "../../constants/index.js";
import { findByQuery } from "../../models/user.model.js";

const PREFIX = "USER | API | LOGIN: ";

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  // validating body payload for blank values
  if (!email || !password) {
    return res.status(httpStatusCode.NOT_FOUND).send({
      message: messages.MISSING_PAYLOAD,
    });
  }

  let user;

  try {
    user = await findByQuery({ email });
    console.log({ user });
    if (!user) {
      return res.status(httpStatusCode.BAD_REQUEST).send({
        message: messages.USER_NOT_FOUND,
      });
    }
  } catch (e) {
    console.log(`${PREFIX} User lookup fails: ${e}`);
    return res.status(httpStatusCode.INTERNAL_SERVER).send({
      message: messages.INTERNAL_SERVER,
    });
  }

  let token;
  try {
    token = await generateAuthToken({
      id: user?._id,
      email: user?.email ?? "",
    });
  } catch (e) {
    console.log(`${PREFIX} generating authorization token failed: ${e}`);
    return res.status(httpStatusCode.INTERNAL_SERVER).send({
      message: messages.INTERNAL_SERVER,
    });
  }

  return res.status(httpStatusCode.OK).send({
    data: {
      user,
      authorizationToken: token,
    },
  });
};
