import mongoose from "mongoose";
import mongooseHidden from "mongoose-hidden";

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
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  bio: { type: String },
  profilePic: { type: String },
  gender: { type: String },
  location: { type: String },
  dob: { type: Date },
  isVerified: { type: Boolean, default: false },
  isReported: { type: Boolean, default: false },
  isBanned: { type: Boolean, default: false },
});

export default mongoose.model("User", UserSchema);
