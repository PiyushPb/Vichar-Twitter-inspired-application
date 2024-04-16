import express from "express";
import {
  createTweet,
  getTweets,
  getUsersTweet,
  likeTweet,
} from "../controller/tweetController.js";

import { authenticate } from "../auth/verifyToken.js";

const router = express.Router();

router.post("/createTweet", authenticate, createTweet);
router.get("/getTweets", authenticate, getTweets);
router.post("/likeTweet", authenticate, likeTweet);
router.get("/getUserTweets/:userId", authenticate, getUsersTweet);

export default router;
