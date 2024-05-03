import mongoose from "mongoose";

const TrendingSchema = new mongoose.Schema({
  trends: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Trending", TrendingSchema);
