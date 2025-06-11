
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
    origin: "https://airbnb-frontend-blue-psi.vercel.app",
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
