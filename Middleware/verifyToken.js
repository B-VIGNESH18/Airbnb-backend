// // // Middleware/verifyToken.js
// // const jwt = require("jsonwebtoken");

// // const verifyToken = (req, res, next) => {
// //   const authHeader = req.headers.authorization;
// //   if (!authHeader)
// //     return res.status(401).json({ message: "No token provided" });

// //   const token = authHeader.split(" ")[1]; // Expect: "Bearer TOKEN"
// //   if (!token) return res.status(401).json({ message: "Token missing" });

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     req.userId = decoded.id; // or whatever payload key you use
// //     next();
// //   } catch (error) {
// //     return res.status(403).json({ message: "Invalid or expired token" });
// //   }
// // };

// // module.exports = verifyToken;
// // Middleware/verifyToken.js
// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader)
//     return res.status(401).json({ message: "No token provided" });

//   const token = authHeader.split(" ")[1]; // Expect: "Bearer TOKEN"
//   if (!token) return res.status(401).json({ message: "Token missing" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.id; // Attach user ID to req object
//     next();
//   } catch (error) {
//     return res.status(403).json({ message: "Invalid or expired token" });
//   }
// };

// module.exports = verifyToken;
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Expect: Bearer token

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("JWT Error:", error.message); // Log the reason
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
