import Tweet from "../models/TweetsSchema.js";
import User from "../models/UserSchema.js";
import News from "../models/NewsSchema.js";
import Trend from "../models/TrendingSchema.js";
import fetch from "node-fetch";

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

export const getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "News fetched successfully",
      news,
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

export const bookmarkTweet = async (req, res) => {
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

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const bookmarkIndex = user.bookmarks.indexOf(tweetId);

    if (bookmarkIndex !== -1) {
      // If the tweet is already bookmarked by the user, remove it
      user.bookmarks.splice(bookmarkIndex, 1);
    } else {
      // If the tweet is not bookmarked by the user, add it
      user.bookmarks.push(tweetId);
    }

    await user.save();

    // Fetch updated tweet after bookmark operation
    const updatedTweet = await Tweet.findById(tweetId);

    return res.status(200).json({
      success: true,
      message: "Tweet bookmarked / removed bookmark successfully",
      tweet: updatedTweet,
    });
  } catch (error) {
    console.error("Error bookmarking / removing bookmark from tweet:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getUsersNews = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const news = await News.find({ userId }).sort({ createdAt: -1 });

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "news not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "news fetched successfully",
      news,
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getSingleTweet = async (req, res) => {
  try {
    const tweetId = req.params.tweetId;

    if (!tweetId) {
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

    console.log(tweet.userId, "Tweet user");

    const user = await User.findById(tweet.userId).select(
      "username name profilePic isVerified plan"
    );

    return res.status(200).json({
      success: true,
      message: "Tweet fetched successfully",
      tweet: tweet,
      user: user,
    });
  } catch (error) {
    console.error("Error fetching tweet:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const { tweetId, comment } = req.body;

    console.log("comment", comment);
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

    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "Comment cannot be empty",
      });
    }

    const sentimentResponse = await fetch(
      "http://localhost:5000/sentimentAnalysis",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: comment }),
      }
    );

    if (!sentimentResponse.ok) {
      throw new Error("Failed to fetch sentiment analysis");
    }

    const sentimentData = await sentimentResponse.json();

    const newComment = {
      userId,
      comment,
      sentimentScore: sentimentData.sentimentScore.polarity,
    };

    tweet.comments.push(newComment);
    tweet.commentsCount += 1;

    await tweet.save();

    if (sentimentData.sentimentScore.polarity < -0.3) {
      return res.status(200).json({
        success: true,
        message:
          "Your comment goes against our community guidelines, we have hidden it by default, if you think theres some mistake please reach out to us.",
        tweet: tweet,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Comment added successfully",
        tweet: tweet,
      });
    }
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getBookmarkedTweets = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const bookmarkedTweets = await Tweet.find({ _id: { $in: user.bookmarks } });

    return res.status(200).json({
      success: true,
      message: "Bookmarked tweets fetched successfully",
      tweets: bookmarkedTweets,
    });
  } catch (error) {
    console.error("Error fetching bookmarked tweets:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const setTrending = async (req, res) => {
  const trend = req.body;

  try {
    const trends = await Trend.create(trend);

    return res.status(200).json({
      success: true,
      message: "Trend added successfully",
      trends: trends,
    });
  } catch (error) {
    console.error("Error adding trend:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getTrends = async (req, res) => {
  try {
    const trends = await Trend.find();

    return res.status(200).json({
      success: true,
      message: "Trends fetched successfully",
      trends: trends,
    });
  } catch (error) {
    console.error("Error fetching trends:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
