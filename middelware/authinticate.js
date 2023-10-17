const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    token = token.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded._id); // Use findById to find a user by ID
    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid Token", error: error.message });
  }
};

module.exports = authenticate;
