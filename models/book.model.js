import { Schema, model } from "mongoose";

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  publishDate: {
    type: Number,
    default: Date.now(),
  },

  createdAt: {
    type: Number,
    default: Date.now(),
  },
  updatedAt: {
    type: Number,
    default: Date.now(),
  },
});

const BookModel = model("book", BookSchema);

/**
 *Function to save the validated details of the book
 * @param book, book validated details
 * @return updated book details after saving in database
 */
const saveRecord = async (book) => {
  const bookInstance = new BookModel(book);
  await bookInstance.save();
  await bookInstance.toJSON();
  return bookInstance;
};

export { BookModel, saveRecord };
