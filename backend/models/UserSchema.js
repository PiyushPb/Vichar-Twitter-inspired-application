import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  credentials: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  phone: { type: String, unique: true, sparse: true },
  bio: { type: String },
  profilePic: { type: String },
  gender: { type: String },
  location: { type: String },
  dob: { type: Date },
  isVerified: { type: Boolean, default: false },
  isReported: { type: Boolean, default: false },
  isBanned: { type: Boolean, default: false },
  tokens: [
    {
      opt: { type: Number },
    },
  ],
  followers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FollowingData",
  },
});

export default mongoose.model("User", UserSchema);
