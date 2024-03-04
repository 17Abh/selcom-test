import express from "express";
import publicRoute from "./public.route.js";
import bookRoute from "./book.route.js";

const router = express.Router();

router.use("/public", publicRoute);

router.use("/book", bookRoute);

export default router;
