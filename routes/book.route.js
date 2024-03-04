import express from "express";
import { addBook } from "../books/api/addBook.js";
import { verifyToken } from "../config/jwtUtils.js";

const router = express.Router();

router.get("/testing", (req, res) => {
  return res.status(200).json({ message: "Success" });
});

// route to add a book
router.post("/book", verifyToken, addBook);

// route to get a book
// router.get("/book/:id", verifyToken, getBook);

// route to get all books
// router.get("/book", verifyToken, fetchBooks);

// route to edit a book
// router.put("/book/:id", verifyToken, updateBook);

// route to delete a book
// router.delete("/book/:id", verifyToken, deleteBook);

export default router;
