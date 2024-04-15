import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";

export const getSingleUser = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "No user found" });
    }

    res.status(200).json({
      success: true,
      message: "User Found",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getSingleUserUsingUID = async (req, res) => {
  const { uid } = req.params;

  try {
    // Assuming uid is the same as MongoDB _id
    const user = await User.findById(uid).select("name profilePic username");

    if (!user) {
      return res.status(404).json({ success: false, message: "No user found" });
    }

    res.status(200).json({
      success: true,
      message: "User Found",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User Found",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const { username, name, email } = req.body;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "No user found" });
    }

    const existingUsername = await User.findOne({ username: username });

    if (existingUsername && existingUsername._id.toString() !== id) {
      return res.status(400).json({
        success: false,
        message: "Username already exists, please choose a different username.",
      });
    }

    const existingEmail = await User.findOne({ email: email });

    if (existingEmail && existingEmail._id.toString() !== id) {
      return res.status(400).json({
        success: false,
        message: "Email already exists, please choose a different email.",
      });
    }

    const updateFields = {
      username,
      name,
      email,
      // Add other fields you want to update here
    };

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const changePassword = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "No user found" });
    }

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Old password and new password are required",
      });
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        password: hashedPassword,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const searchUser = async (req, res) => {
  const { query } = req.params;
  try {
    let users;
    if (query.trim() !== "") {
      // Constructing the search query dynamically
      const regex = new RegExp(`^${query}`, "i");
      users = await User.find({
        $or: [{ username: { $regex: regex } }, { name: { $regex: regex } }],
      })
        .limit(20)
        .select("-password");
    } else {
      users = [];
    }

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const followUser = async (req, res) => {
  try {
    const alreadyFollowing = await User.findOne({
      _id: req.userId,
      following: req.params.followId,
    });

    if (alreadyFollowing) {
      return res
        .status(422)
        .json({ error: "You have already followed this user." });
    }

    // Update the user being followed to add the follower
    const updatedUser = await User.findByIdAndUpdate(
      req.params.followId,
      { $push: { followers: req.userId } },
      { new: true }
    );

    // Update the current user to add the user they followed
    const currentUser = await User.findByIdAndUpdate(
      req.userId,
      { $push: { following: req.params.followId } },
      { new: true }
    );

    res.json({ updatedUser, currentUser });
  } catch (error) {
    console.error(error);
    res.status(422).json({ error: error.message });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const alreadyFollowing = await User.findOne({
      _id: req.userId,
      following: req.params.unFollowId, // Corrected parameter name
    });

    if (!alreadyFollowing) {
      // Changed condition to check if already following
      return res
        .status(422)
        .json({ error: "You are not following this user." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.unFollowId, // Corrected parameter name
      { $pull: { followers: req.userId } },
      { new: true }
    );

    const currentUser = await User.findByIdAndUpdate(
      req.userId,
      { $pull: { following: req.params.unFollowId } },
      { new: true }
    );

    res.json({ updatedUser, currentUser });
  } catch (error) {
    console.error(error);
    res.status(422).json({ error: error.message });
  }
};
