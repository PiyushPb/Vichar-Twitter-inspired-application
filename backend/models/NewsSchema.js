import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  artileURL: {
    type: String,
  },
  articlePublishDate: {
    type: String,
    required: true,
  },
  polarity: {
    type: String,
    required: true,
  },
  sentiment: {
    type: String,
    required: true,
  },
  createdOn: { type: Date, default: Date.now },
});

export default mongoose.model("News", NewsSchema);
