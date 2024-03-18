import express from "express";
import {
  getSingleUser,
  getCurrentUser,
  updateUserProfile,
  changePassword,
} from "../controller/userController.js";
import { authenticate } from "../auth/verifyToken.js";

const router = express.Router();

router.get("/currentUser", authenticate, getCurrentUser);
router.get("/:username", authenticate, getSingleUser);
router.patch("/updateUserProfile/:id", authenticate, updateUserProfile);
router.patch("/changePassword/:id", authenticate, changePassword);

export default router;
