import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";

export const authenticate = async (req, res, next) => {
  const reqToken = req.headers.authorization;

  if (!reqToken || !reqToken.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  }

  try {
    const token = reqToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.userId = decoded.id;
    req.username = decoded.username;

    console.log(req.userId, req.username);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Session Expired" });
    }
    return res.status(401).json({ success: false, message: error.message });
  }
};
