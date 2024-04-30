import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/AuthRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import tweetRoutes from "./routes/TweetRoutes.js";
import checkoutRoute from "./routes/Checkout.js";
import premiumRoute from "./routes/PremiumRoute.js";

const app = express();

const corsOptions = {
  origin: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

dotenv.config();
const PORT = process.env.PORT || 5000;

try {
  await mongoose.connect(process.env.MONGODB_URL, { dbName: "usersDb" });
  console.log("MongoDB connected");
} catch (error) {
  console.error("MongoDB connection error:", error);
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/v1/auth/", authRoutes);
app.use("/v1/user/", userRoutes);
app.use("/v1/tweet/", tweetRoutes);
app.use("/v1/premium/", checkoutRoute);
app.use("/v1/premium/", premiumRoute);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
