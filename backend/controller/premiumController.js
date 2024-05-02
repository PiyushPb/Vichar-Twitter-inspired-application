import OpenAI from "openai";
import User from "../models/UserSchema.js";
import NewsSchema from "../models/NewsSchema.js";
import Tweet from "../models/TweetsSchema.js";

// DALLE CONFIGRATION

const openai = new OpenAI({
  apiKey: "",
});

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "url",
    });

    const imageUrl = aiResponse.data[0].url;

    res.status(200).json({ photoUrl: imageUrl });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "Could not generate image. Please try again later." });
  }
};

export const addImage = async (req, res) => {
  const userId = req.userId;
  const { tweet, images } = req.body;

  try {
    if (!images) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    if (!tweet) {
      return res.status(400).json({
        success: false,
        message: "Tweet is required",
      });
    }

    const newTweet = new Tweet({
      tweet,
      userId,
      images: images || [],
      isPremium: true,
    });

    await newTweet.save();

    const updateUser = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { tweets: newTweet._id } },
      { new: true }
    );

    if (!updateUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Image added successfully",
      data: newTweet,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addSummerizedNews = async (req, res) => {
  const uid = req.userId;
  const { title, summary, artileURL, articlePublishDate, polarity, sentiment } =
    req.body;
  try {
    if (!uid) throw Error("uid not found");

    if (!uid) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const news = new NewsSchema({
      userId: uid,
      title,
      summary,
      artileURL,
      articlePublishDate,
      polarity,
      sentiment,
    });
    await news.save();

    const updateUser = await User.findOneAndUpdate(
      { _id: uid },
      { $push: { news: news._id } },
      { new: true }
    );

    if (!updateUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res
      .status(200)
      .json({ success: true, message: "News added successfully", data: news });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
