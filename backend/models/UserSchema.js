import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

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
  location: { type: String },
  website: { type: String },
  profilePic: {
    type: String,
    default:
      "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg",
  },
  coverPhoto: {
    type: String,
    default: "https://source.unsplash.com/random",
  },
  gender: { type: String },
  dob: { type: Date },
  isVerified: { type: Boolean, default: false },
  plan: { type: String },
  premiumToken: { type: String },
  isReported: { type: Boolean, default: false },
  isBanned: { type: Boolean, default: false },
  tokens: [{ opt: { type: Number } }],
  following: [{ type: ObjectId, ref: "User" }],
  followers: [{ type: ObjectId, ref: "User" }],
  tweets: [{ type: ObjectId, ref: "Tweet" }],
  news: [{ type: ObjectId, ref: "News" }],
  bookmarks: [{ type: ObjectId, ref: "Tweet" }],
});

export default mongoose.model("User", UserSchema);
