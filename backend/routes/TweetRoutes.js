import express from "express";
import {
  addComment,
  createTweet,
  getSingleTweet,
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
router.get("/getTweet/:tweetId", authenticate, getSingleTweet);
router.post("/addComment", authenticate, addComment);

export default router;
