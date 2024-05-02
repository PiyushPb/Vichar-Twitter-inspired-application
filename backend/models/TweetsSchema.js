import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const CommentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  sentimentScore: {
    type: Number,
    required: true,
  },
  commentedAt: {
    type: Date,
    default: Date.now,
  },
});

const TweetSchema = new mongoose.Schema({
  tweet: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  isPremium: {
    type: Boolean,
    default: false,
  },
  likes: {
    count: {
      type: Number,
      default: 0,
    },
    users: [LikeSchema],
  },
  comments: [CommentSchema],
  commentsCount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Tweet", TweetSchema);
