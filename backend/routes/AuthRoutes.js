import express from "express";

import {
  registerUser,
  login,
  forgetPassword,
  resetPassword,
} from "../controller/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/forget-password", forgetPassword);
router.post("/resetPassword/:id/:resetToken", resetPassword);

export default router;
