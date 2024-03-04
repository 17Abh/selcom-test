import { httpStatusCode, messages } from "../../constants/index.js";
import { UserModel, saveRecord } from "../../models/user.model.js";

const PREFIX = "USER | REGISTER: ";

export const UserCreate = async (req, res) => {
  const { body } = req;

  // validating body payload for blank values
  if (!Object.keys(body).length) {
    return res.status(httpStatusCode.NOT_FOUND).send({
      message: messages.MISSING_PAYLOAD,
    });
  }

  // validating user model
  try {
    await UserModel.validate(body);
  } catch (e) {
    return res.status(httpStatusCode.BAD_REQUEST).send({
      message: messages.VALIDATION_ERROR,
    });
  }

  body.email = body.email.trim().toLowerCase();

  try {
    user = await saveRecord(body);
  } catch (e) {
    console.log(`${PREFIX} user save failed, error: ${e}`);
    return res.status(httpStatusCode.INTERNAL_SERVER).send({
      message: messages.INTERNAL_SERVER,
    });
  }

  // update user response
  res.status(httpStatusCode.CREATED).send({
    message: messages.USER_REGISTERED,
  });
};
