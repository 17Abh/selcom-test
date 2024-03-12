import express from "express";
import { addBook } from "../books/api/addBook.js";
import { verifyToken } from "../config/jwtUtils.js";
import { updateBook } from "../books/api/updateBook.js";
import { getBook } from "../books/api/getBook.js";
import { deleteBook } from "../books/api/deleteBook.js";
import { fetchBooks } from "../books/api/fetchBooks.js";

const router = express.Router();

router.get("/testing", (req, res) => {
  return res.status(200).json({ message: "Success" });
});

// route to add a book
router.post("/add", verifyToken, addBook);

// route to get all books
router.get("/all", verifyToken, fetchBooks);

// route to get a book
router.get("/:id", verifyToken, getBook);

// route to edit a book
router.put("/:id", verifyToken, updateBook);

// route to delete a book
router.delete("/:id", verifyToken, deleteBook);

export default router;
