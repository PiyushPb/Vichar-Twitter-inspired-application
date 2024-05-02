import express from "express";
import {
  generateImage,
  addSummerizedNews,
  addImage,
} from "../controller/premiumController.js";
import { authenticate } from "../auth/verifyToken.js";

const router = express.Router();

router.post("/genrateImage", generateImage);
router.post("/newsSummerization", authenticate, addSummerizedNews);
router.post("/addImage", authenticate, addImage);
export default router;
