import { httpStatusCode, messages } from "../../constants/index.js";
import { BookModel, saveRecord } from "../../models/book.model.js";

const PREFIX = "BOOK | ADD: ";

export const addBook = async (req, res) => {
  const { body } = req;

  // validating body payload for blank values
  if (!Object.keys(body).length) {
    return res.status(httpStatusCode.NOT_FOUND).send({
      message: messages.MISSING_PAYLOAD,
    });
  }

  // validating book model
  try {
    await BookModel.validate(body);
  } catch (e) {
    return res.status(httpStatusCode.BAD_REQUEST).send({
      message: messages.VALIDATION_ERROR,
    });
  }

  let book;

  try {
    book = await saveRecord(body);
  } catch (e) {
    console.log(`${PREFIX} user save failed, error: ${e}`);
    return res.status(httpStatusCode.INTERNAL_SERVER).send({
      message: messages.INTERNAL_SERVER,
    });
  }

  // update user response
  res.status(httpStatusCode.CREATED).send({
    book,
  });
};
