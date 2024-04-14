import express from "express";
import {
  getSingleUser,
  getCurrentUser,
  updateUserProfile,
  getSingleUserUsingUID,
  changePassword,
  searchUser,
} from "../controller/userController.js";
import { authenticate } from "../auth/verifyToken.js";

const router = express.Router();

router.get("/currentUser", authenticate, getCurrentUser);
router.get("/:username", authenticate, getSingleUser);
router.get("/userUID/:uid", authenticate, getSingleUserUsingUID);
router.patch("/updateUserProfile/:id", authenticate, updateUserProfile);
router.patch("/changePassword/:id", authenticate, changePassword);
router.get("/searchUser/:query", authenticate, searchUser);

export default router;
