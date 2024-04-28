import express from "express";
import {
  createCheckoutSession,
  //   handlePaymentSuccess,
} from "../controller/checkoutController.js";

const router = express.Router();

router.post("/createcheckoutsession", createCheckoutSession);
// router.post("/handlePaymentSuccess", handlePaymentSuccess);

export default router;
