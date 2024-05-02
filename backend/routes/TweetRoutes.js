import express from "express";
import {
  addComment,
  bookmarkTweet,
  createTweet,
  getBookmarkedTweets,
  getNews,
  getSingleTweet,
  getTweets,
  getUsersNews,
  getUsersTweet,
  likeTweet,
} from "../controller/tweetController.js";

import { authenticate } from "../auth/verifyToken.js";

const router = express.Router();

router.post("/createTweet", authenticate, createTweet);
router.get("/getTweets", authenticate, getTweets);
router.get("/getNews", authenticate, getNews);
router.post("/likeTweet", authenticate, likeTweet);
router.post("/bookmarkTweet", authenticate, bookmarkTweet);
router.get("/getUserTweets/:userId", authenticate, getUsersTweet);
router.get("/getUsersNews/:userId", authenticate, getUsersNews);
router.get("/getTweet/:tweetId", authenticate, getSingleTweet);
router.post("/addComment", authenticate, addComment);
router.get("/getBookmarkTweets", authenticate, getBookmarkedTweets);

export default router;
