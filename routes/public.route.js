import express from "express";
import { UserCreate } from "../user/api/createUser.js";
import { userLogin } from "../user/api/login.js";

const router = express.Router();

router.get("/testing", (req, res) => {
  return res.status(200).json({ message: "Success" });
});

router.post("/user", UserCreate);

router.post("/user/login", userLogin);

export default router;
