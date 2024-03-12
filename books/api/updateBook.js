import { httpStatusCode, messages } from "../../constants/index.js";
import { bookUpdate } from "../../models/book.model.js";

const PREFIX = "BOOK | UPDATE: ";

export const updateBook = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  // validating body payload for blank values
  if (!Object.keys(body).length || !id) {
    return res.status(httpStatusCode.NOT_FOUND).send({
      message: messages.MISSING_PAYLOAD,
    });
  }

  // updating the user in database
  const fieldToUpdate = {
    title: body.title,
    author: body.author,
    genre: body.genre,
    price: body.price,
  };

  for (const [key, value] of Object.entries(fieldToUpdate)) {
    if (!value) {
      delete fieldToUpdate[key];
    }
  }

  let bookUpdateRes;

  try {
    bookUpdateRes = await bookUpdate({ ...fieldToUpdate }, id);
    if (!bookUpdate) {
      console.log(`${PREFIX} book  update failed`);
      return res.status(httpStatusCode.NOT_FOUND).send({
        message: messages.INVALID_REQUEST,
      });
    }
  } catch (err) {
    console.log(`${PREFIX} Update book failed with error: ${err}`);
    return res.status(httpStatusCode.INTERNAL_SERVER).send({
      message: messages.INTERNAL_SERVER,
    });
  }

  // update user response
  res.status(httpStatusCode.OK).send({
    bookUpdateRes,
  });
};
