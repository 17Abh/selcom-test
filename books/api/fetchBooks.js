import { httpStatusCode, messages } from "../../constants/index.js";
import { BookModel } from "../../models/book.model.js";

const PREFIX = "BOOK | FETCH: ";

export const fetchBooks = async (req, res) => {
  let books;
  try {
    books = await BookModel.find({});
    if (!books) {
      console.log(`${PREFIX} books fetch failed`);
      return res.status(httpStatusCode.NOT_FOUND).send({
        message: messages.INVALID_REQUEST,
      });
    }
  } catch (err) {
    console.log(`${PREFIX} fetch books failed with error: ${err}`);
    return res.status(httpStatusCode.INTERNAL_SERVER).send({
      message: messages.INTERNAL_SERVER,
    });
  }

  // update user response
  res.status(httpStatusCode.OK).send({
    books,
  });
};
