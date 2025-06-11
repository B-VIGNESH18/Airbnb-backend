
// const express = require('express');
// const router = express.Router();
// const { createBooking, getUserBookings } = require('../Controllers/BookingController');

// router.post('/', createBooking);
// router.get('/', getUserBookings);

// module.exports = router;
const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/verifyToken");
const {
  createBooking,
  getUserBookings,
  deleteBooking,
} = require("../Controllers/BookingController");

router.post("/", verifyToken, createBooking);
router.get("/", verifyToken, getUserBookings);
router.delete("/:id", verifyToken, deleteBooking);

module.exports = router;

