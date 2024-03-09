import express from "express";

import {
  getSingleUser,
  getCurrentUser,
  updateUserProfile,
  changePassword,
} from "../controller/userController.js";

const router = express.Router();

import { authenticate } from "../auth/verifyToken.js";

router.get("/:username", authenticate, getSingleUser);
router.get("/currentUser/:id", authenticate, getCurrentUser);
router.patch("/updateUserProfile/:id", authenticate, updateUserProfile);
router.patch("/changePassword/:id", authenticate, changePassword);


export default router;
