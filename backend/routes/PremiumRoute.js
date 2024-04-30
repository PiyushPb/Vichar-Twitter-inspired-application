import express from "express";
import { generateImage } from "../controller/premiumController.js";

const router = express.Router();

router.post("/genrateImage", generateImage);
export default router;
