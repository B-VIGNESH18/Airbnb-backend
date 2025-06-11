const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const AuthMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, jwtSecret);
    req.userData = decoded;
    next();
  } catch (error) {
    console.error("AuthMiddleware error:", error.message);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = AuthMiddleware;
