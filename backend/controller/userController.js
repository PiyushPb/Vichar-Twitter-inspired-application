import User from "../models/UserSchema.js";
import Follower from "../models/FollowingDataSchema.js";
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
export const followUser = async (req, res) => {};
