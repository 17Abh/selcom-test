import { httpStatusCode, messages } from "../../constants/index.js";
import { BookModel } from "../../models/book.model.js";

const PREFIX = "BOOK | DELETE: ";

export const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(httpStatusCode.NOT_FOUND).send({
      message: messages.MISSING_PAYLOAD,
    });
  }

  let book;

  try {
    book = await BookModel.findByIdAndDelete({ _id: id }).lean();
    if (!book) {
      console.log(`${PREFIX} book delete failed`);
      return res.status(httpStatusCode.NOT_FOUND).send({
        message: messages.INVALID_REQUEST,
      });
    }
  } catch (err) {
    console.log(`${PREFIX} delete book failed with error: ${err}`);
    return res.status(httpStatusCode.INTERNAL_SERVER).send({
      message: messages.INTERNAL_SERVER,
    });
  }

  // update user response
  res.status(httpStatusCode.OK).send({
    book,
  });
};
