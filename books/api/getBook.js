import { httpStatusCode, messages } from "../../constants/index.js";
import { BookModel } from "../../models/book.model.js";

const PREFIX = "BOOK | GET: ";

export const getBook = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(httpStatusCode.NOT_FOUND).send({
      message: messages.MISSING_PAYLOAD,
    });
  }

  let book;

  try {
    book = await BookModel.findOne({ _id: id });
    if (!book) {
      console.log(`${PREFIX} book get failed`);
      return res.status(httpStatusCode.NOT_FOUND).send({
        message: messages.INVALID_REQUEST,
      });
    }
  } catch (err) {
    console.log(`${PREFIX} get book failed with error: ${err}`);
    return res.status(httpStatusCode.INTERNAL_SERVER).send({
      message: messages.INTERNAL_SERVER,
    });
  }

  // update user response
  res.status(httpStatusCode.OK).send({
    book,
  });
};
