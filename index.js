// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const cookieParser = require("cookie-parser");

// const placeRoutes = require("./Routes/PlaceRoutes");

// const errorHandler = require("./Middleware/ErrorHandler");
// const generateToken = require("./Utils/JwtUtils");
// const User = require("./Models/User");
// const Booking = require("./Models/Booking");
// const verifyToken = require("./Middleware/verifyToken.js");

// const bcryptSalt = bcrypt.genSaltSync(10);
// const app = express();

// app.use(express.json());
// app.use(cookieParser());
// const allowedOrigins = [
//   // "https://mern-project-liart.vercel.app",
//   "http://localhost:5173",
// ];

// app.use(
//   cors({
//     credentials: true,
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );

// PORT = process.env.PORT;
// mongoose
//   .connect(process.env.MONGO_CONNECTION_STRING, {})
//   .then(() => {
//     console.log("MongoDB connected successfully");
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err.message);
//   });
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "server is healthy" });
// });

// app.use("/api/places", placeRoutes);

// app.use(errorHandler);

// // register api
// app.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const userDoc = await User.create({
//       name,
//       email,
//       password: bcrypt.hashSync(password, bcryptSalt),
//     });
//     res.json(userDoc);
//   } catch (e) {
//     res.status(422).json(e);
//   }
// });

// // login api

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const userDoc = await User.findOne({ email });
//   if (userDoc && bcrypt.compareSync(password, userDoc.password)) {
//     const token = await generateToken(userDoc);
//     console.log(token);
//     res.status(200).json({ token, userDoc });
//   } else {
//     res.status(422).json("Invalid credentials");
//   }
// });

// app.get("/profile", async (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   try {
//     const decode = jwt.verify(token, process.env.JWT_SECRET);
//     const userDoc = await User.findById(decode.id);
//     if (!userDoc) {
//       res.status(404).json("User not found");
//     } else {
//       res.status(200).json({ userDoc });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "error msg form catch block" });
//   }
// });

// // logout api
// let tokenStore = [];

// app.post("/logout", (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Token required" });
//   }

//   // Invalidate the token (e.g., by removing it from the token store)
//   tokenStore = tokenStore.filter((storedToken) => storedToken !== token);

//   return res.status(200).json({ message: "Logout successful" });
// });

// app.post("/bookings", async (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   const decode = jwt.verify(token, process.env.JWT_SECRET);
//   const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
//     req.body;
//   await Booking.create({
//     place,
//     checkIn,
//     checkOut,
//     numberOfGuests,
//     name,
//     phone,
//     price,
//     user: decode.id,
//   })
//     .then((doc) => {
//       res.json(doc);
//     })
//     .catch((err) => {
//       throw err;
//     });
// });

// app.get("/bookings", async (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   try {
//     const decode = jwt.verify(token, process.env.JWT_SECRET);
//     res
//       .status(200)
//       .json(await Booking.find({ user: decode.id }).populate("place"));
//   } catch (error) {
//     res.status(500).json({ message: "error msg from booking get api " });
//   }
// });

// // Cancel Booking API
// app.delete("/bookings/:id", verifyToken, async (req, res) => {
//   const bookingId = req.params.id;
//   const userId = req.userId; // Get userId from token verification middleware

//   try {
//     const booking = await Booking.findOneAndDelete({
//       _id: bookingId,
//       user: userId,
//     });

//     if (!booking) {
//       return res
//         .status(404)
//         .json({
//           message:
//             "Booking not found or you are not authorized to cancel this booking",
//         });
//     }

//     res.status(200).json({ message: "Booking cancelled successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// app.listen(PORT, () => {
//   console.log("Server is running on port ", PORT);
// });
// index.js
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const cookieParser = require("cookie-parser");

// const placeRoutes = require("./Routes/PlaceRoutes");
// const errorHandler = require("./Middleware/ErrorHandler");
// const generateToken = require("./Utils/JwtUtils");
// const User = require("./Models/User");
// const Booking = require("./Models/Booking");
// const verifyToken = require("./Middleware/verifyToken");

// const bcryptSalt = bcrypt.genSaltSync(10);
// const app = express();

// app.use(express.json());
// app.use(cookieParser());

// const allowedOrigins = ["http://localhost:5173"];

// app.use(
//   cors({
//     credentials: true,
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );

// const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(process.env.MONGO_CONNECTION_STRING)
//   .then(() => console.log("MongoDB connected successfully"))
//   .catch((err) => console.error("MongoDB connection error:", err.message));

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "server is healthy" });
// });

// // Register
// app.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const userDoc = await User.create({
//       name,
//       email,
//       password: bcrypt.hashSync(password, bcryptSalt),
//     });
//     res.json(userDoc);
//   } catch (e) {
//     res.status(422).json(e);
//   }
// });

// // Login
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const userDoc = await User.findOne({ email });

//   if (userDoc && bcrypt.compareSync(password, userDoc.password)) {
//     const token = generateToken(userDoc);
//     res.status(200).json({ token });
//   } else {
//     res.status(422).json("Invalid credentials");
//   }
// });

// // Profile (fixed!)
// app.get("/profile", async (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Token missing" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id, "-password");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(user);
//   } catch (err) {
//     console.error("Error in /profile route:", err.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });


// // Logout
// let tokenStore = [];

// app.post("/logout", (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Token required" });
//   tokenStore = tokenStore.filter((storedToken) => storedToken !== token);
//   return res.status(200).json({ message: "Logout successful" });
// });

// // Bookings
// app.post("/bookings", async (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   const decode = jwt.verify(token, process.env.JWT_SECRET);

//   const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
//     req.body;

//   try {
//     const booking = await Booking.create({
//       place,
//       checkIn,
//       checkOut,
//       numberOfGuests,
//       name,
//       phone,
//       price,
//       user: decode.id,
//     });

//     res.json(booking);
//   } catch (err) {
//     res.status(500).json({ message: "Booking creation failed", error: err.message });
//   }
// });

// app.get("/bookings", async (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   try {
//     const decode = jwt.verify(token, process.env.JWT_SECRET);
//     const bookings = await Booking.find({ user: decode.id }).populate("place");
//     res.status(200).json(bookings);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching bookings", error: error.message });
//   }
// });

// app.delete("/bookings/:id", verifyToken, async (req, res) => {
//   const bookingId = req.params.id;
//   const userId = req.userId;

//   try {
//     const booking = await Booking.findOneAndDelete({
//       _id: bookingId,
//       user: userId,
//     });

//     if (!booking) {
//       return res.status(404).json({
//         message: "Booking not found or unauthorized",
//       });
//     }

//     res.status(200).json({ message: "Booking cancelled successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// app.use("/api/places", placeRoutes);
// app.use(errorHandler);

// app.listen(PORT, () => {
//   console.log("Server is running on port", PORT);
// });

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const cookieParser = require("cookie-parser");
// const path = require("path");

// const placeRoutes = require("./Routes/PlaceRoutes");
// const errorHandler = require("./Middleware/ErrorHandler");
// const generateToken = require("./Utils/JwtUtils");
// const connectDB = require("./Utils/DbConnection");

// const User = require("./Models/User");
// const Booking = require("./Models/Booking");
// const verifyToken = require("./Middleware/verifyToken");

// const bcryptSalt = bcrypt.genSaltSync(10);
// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:5173",
//   })
// );

// // Serve static files (images)
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Connect MongoDB
// connectDB();

// const PORT = process.env.PORT || 5000;

// // Health check
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Server is healthy" });
// });

// // -------------------- Auth Routes --------------------

// // Register
// app.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const userDoc = await User.create({
//       name,
//       email,
//       password: bcrypt.hashSync(password, bcryptSalt),
//     });
//     res.json(userDoc);
//   } catch (e) {
//     res.status(422).json(e);
//   }
// });

// // Login
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const userDoc = await User.findOne({ email });

//   if (userDoc && bcrypt.compareSync(password, userDoc.password)) {
//     const token = generateToken(userDoc);
//     res.status(200).json({ token });
//   } else {
//     res.status(422).json("Invalid credentials");
//   }
// });

// // Profile
// app.get("/profile", async (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Token missing" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id, "-password");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(user);
//   } catch (err) {
//     console.error("Error in /profile route:", err.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Logout (Optional)
// let tokenStore = [];
// app.post("/logout", (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Token required" });
//   tokenStore = tokenStore.filter((storedToken) => storedToken !== token);
//   return res.status(200).json({ message: "Logout successful" });
// });

// // -------------------- Booking Routes --------------------

// // Create Booking
// app.post("/bookings", async (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   const decode = jwt.verify(token, process.env.JWT_SECRET);

//   const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
//     req.body;

//   try {
//     const booking = await Booking.create({
//       place,
//       checkIn,
//       checkOut,
//       numberOfGuests,
//       name,
//       phone,
//       price,
//       user: decode.id,
//     });

//     res.json(booking);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Booking creation failed", error: err.message });
//   }
// });

// // Get All Bookings
// app.get("/bookings", async (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   try {
//     const decode = jwt.verify(token, process.env.JWT_SECRET);
//     const bookings = await Booking.find({ user: decode.id }).populate("place");
//     res.status(200).json(bookings);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching bookings", error: error.message });
//   }
// });

// // Delete Booking
// app.delete("/bookings/:id", verifyToken, async (req, res) => {
//   const bookingId = req.params.id;
//   const userId = req.userId;

//   try {
//     const booking = await Booking.findOneAndDelete({
//       _id: bookingId,
//       user: userId,
//     });

//     if (!booking) {
//       return res
//         .status(404)
//         .json({ message: "Booking not found or unauthorized" });
//     }

//     res.status(200).json({ message: "Booking cancelled successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// // -------------------- Other Routes --------------------

// app.use("/api/places", placeRoutes); // All Place routes (Create, Get, Edit, Delete)

// app.use(errorHandler); // Custom error handler

// // Start server
// app.listen(PORT, () => {
//   console.log("Server is running on port", PORT);
// // });
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const cookieParser = require("cookie-parser");
// const path = require("path");

// const placeRoutes = require("./Routes/PlaceRoutes");
// const errorHandler = require("./Middleware/ErrorHandler");
// const generateToken = require("./Utils/JwtUtils");
// const connectDB = require("./Utils/DbConnection");

// const User = require("./Models/User");
// const Booking = require("./Models/Booking");
// const verifyToken = require("./Middleware/verifyToken");

// const bcryptSalt = bcrypt.genSaltSync(10);
// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:5173",
//   })
// );

// // Serve static files (images)
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Connect MongoDB
// connectDB();

// const PORT = process.env.PORT || 5000;

// // -------------------- Health Check --------------------
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Server is healthy" });
// });

// // -------------------- Auth Routes --------------------

// // Register
// app.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const userDoc = await User.create({
//       name,
//       email,
//       password: bcrypt.hashSync(password, bcryptSalt),
//     });
//     res.json(userDoc);
//   } catch (e) {
//     res.status(422).json(e);
//   }
// });

// // Login
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const userDoc = await User.findOne({ email });

//   if (userDoc && bcrypt.compareSync(password, userDoc.password)) {
//     const token = generateToken(userDoc);
//     res.status(200).json({ token });
//   } else {
//     res.status(422).json("Invalid credentials");
//   }
// });

// // Profile
// app.get("/profile", async (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Token missing" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id, "-password");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(user);
//   } catch (err) {
//     console.error("Error in /profile route:", err.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Logout (Optional)
// let tokenStore = [];
// app.post("/logout", (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Token required" });
//   tokenStore = tokenStore.filter((storedToken) => storedToken !== token);
//   return res.status(200).json({ message: "Logout successful" });
// });

// // -------------------- Booking Routes (with /api prefix) --------------------

// // Create Booking
// app.post("/bookings", async (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   const decode = jwt.verify(token, process.env.JWT_SECRET);

//   const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
//     req.body;

//   try {
//     const booking = await Booking.create({
//       place,
//       checkIn,
//       checkOut,
//       numberOfGuests,
//       name,
//       phone,
//       price,
//       user: decode.id,
//     });

//     res.json(booking);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Booking creation failed", error: err.message });
//   }
// });

// // Get All Bookings
// app.get("/bookings", async (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   try {
//     const decode = jwt.verify(token, process.env.JWT_SECRET);
//     const bookings = await Booking.find({ user: decode.id }).populate("place");
//     res.status(200).json(bookings);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching bookings", error: error.message });
//   }
// });

// // Delete Booking
// app.delete("/bookings/:id", verifyToken, async (req, res) => {
//   const bookingId = req.params.id;
//   const userId = req.userId;

//   try {
//     const booking = await Booking.findOneAndDelete({
//       _id: bookingId,
//       user: userId,
//     });

//     if (!booking) {
//       return res
//         .status(404)
//         .json({ message: "Booking not found or unauthorized" });
//     }

//     res.status(200).json({ message: "Booking cancelled successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// // -------------------- Other Routes --------------------

// app.use("/api/places", placeRoutes); // Place routes
// app.use(errorHandler); // Custom error handler

// // -------------------- Start Server --------------------
// app.listen(PORT, () => {
//   console.log("Server is running on port", PORT);
// });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const path = require("path");

const placeRoutes = require("./Routes/PlaceRoutes");
const errorHandler = require("./Middleware/ErrorHandler");
const generateToken = require("./Utils/JwtUtils");
const connectDB = require("./Utils/DbConnection");

const User = require("./Models/User");
const Booking = require("./Models/Booking");
const verifyToken = require("./Middleware/verifyToken");

const bcryptSalt = bcrypt.genSaltSync(10);
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "https://airbnb-frontend-blue-psi.vercel.app/",
  })
);

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect DB
connectDB();

const PORT = process.env.PORT || 5000;

// Health check
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});

// -------------------- Auth Routes --------------------

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (userDoc && bcrypt.compareSync(password, userDoc.password)) {
    const token = generateToken(userDoc);
    res.status(200).json({ token });
  } else {
    res.status(422).json("Invalid credentials");
  }
});

app.get("/profile", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id, "-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Error in /profile:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
});

app.post("/logout", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token required" });
  return res.status(200).json({ message: "Logout successful" });
});

// -------------------- Booking Routes --------------------

app.post("/bookings", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
      req.body;

    const booking = await Booking.create({
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price,
      user: decode.id,
    });

    res.json(booking);
  } catch (err) {
    console.error("Booking failed:", err.message);
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
});

app.get("/bookings", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const bookings = await Booking.find({ user: decode.id }).populate("place");
    res.status(200).json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching bookings", error: error.message });
  }
});

app.delete("/bookings/:id", verifyToken, async (req, res) => {
  const bookingId = req.params.id;
  const userId = req.userId;

  try {
    const booking = await Booking.findOneAndDelete({
      _id: bookingId,
      user: userId,
    });
    if (!booking) {
      return res
        .status(404)
        .json({ message: "Booking not found or unauthorized" });
    }

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// -------------------- Other Routes --------------------

app.use("/api/places", placeRoutes);
app.use(errorHandler);

// -------------------- Start Server --------------------

app.listen(PORT, () => {
  console.log("✅ Server is running on http://localhost:" + PORT);
});
