import Tweet from "../models/TweetsSchema.js";
import User from "../models/UserSchema.js";

export const createTweet = async (req, res) => {
  try {
    const userId = req.userId;
    const { tweet, images } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!tweet) {
      return res.status(400).json({
        success: false,
        message: "Tweet cannot be empty",
      });
    }

    const newTweet = new Tweet({
      tweet,
      userId,
      images: images || [],
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

    return res.status(201).json({
      success: true,
      message: "Tweet created successfully",
      tweet: newTweet,
    });
  } catch (error) {
    console.error("Error creating tweet:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Tweets fetched successfully",
      tweets,
    });
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const likeTweet = async (req, res) => {
  try {
    const { tweetId } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return res.status(404).json({
        success: false,
        message: "Tweet not found",
      });
    }

    // Check if the user has already liked the tweet
    const index = tweet.likes.users.findIndex((like) =>
      like.userId.equals(userId)
    );

    if (index !== -1) {
      // If the user has already liked the tweet, remove their like
      tweet.likes.users.splice(index, 1);
      tweet.likes.count--;
    } else {
      // If the user hasn't liked the tweet, add their like
      tweet.likes.users.push({ userId });
      tweet.likes.count++;
    }

    await tweet.save();

    return res.status(200).json({
      success: true,
      message: "Tweet liked / unliked successfully",
      tweet: tweet,
    });
  } catch (error) {
    console.error("Error liking / unliking tweet:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getUsersTweet = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const tweets = await Tweet.find({ userId }).sort({ createdAt: -1 });

    if (!tweets) {
      return res.status(404).json({
        success: false,
        message: "Tweets not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tweets fetched successfully",
      tweets,
    });
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
