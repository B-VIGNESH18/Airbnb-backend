// const Booking = require('../Models/Booking');
// const authMiddleware = require('../Middleware/AuthMiddleware');

// // const BookingController = {
// //   createBooking: async (req, res) => {
// //     const { checkIn, checkOut, numberOfGuests, name, phone, place, price } = req.body;
// //     const userId = req.userData.id; 

// //     try {
// //       const booking = new Booking({
// //         checkIn, checkOut, numberOfGuests, name, phone, place, price, user: userId // Associate booking with the user
// //       });
// //       await booking.save();
// //       res.status(201).json(booking);
// //     } catch (error) {
// //       res.status(500).json({ message: "Booking failed. Please try again." });
// //     }
// //   },

// //   getAllBookings: async (req, res) => {
// //     const userId = req.userData.id; 

// //     try {
      
// //       const bookings = await Booking.find({ user: userId }).populate('place');
// //       res.status(200).json(bookings);
// //     } catch (error) {
// //       res.status(500).json({ message: 'Internal server error' });
// //     }
// //   },
// // };

// // module.exports = BookingController;

// const BookingController = {
//   createBooking: async (req, res) => {
//     const { checkIn, checkOut, numberOfGuests, name, phone, place, price } = req.body;
//     const userId = req.userData.id; 

//     try {
//       const booking = new Booking({
//         checkIn, checkOut, numberOfGuests, name, phone, place, price, user: userId // Associate booking with the user
//       });
//       const savedBooking = await booking.save();
//       res.status(201).json(savedBooking);
//     } catch (error) {
//       res.status(500).json({ message: "Booking failed. Please try again." });
//     }
//   },

//   getAllBookings: async (req, res) => {
//     const userId = req.userData.id; 

//     try {
//       const bookings = await Booking.find({ user: userId }).populate('place');
//       res.status(200).json(bookings);
//     } catch (error) {
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   },
// };

// module.exports = BookingController;

// const Booking = require('../Models/Booking')
// const jwt = require('jsonwebtoken');

// const createBooking = async (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   const decode = jwt.verify(token, process.env.JWT_SECRET);
//   const { place, checkIn, checkOut, numberOfGuests, name, phone, price } = req.body;

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
//     res.status(201).json(booking);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// const getUserBookings = async (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   try {
//     const decode = jwt.verify(token, process.env.JWT_SECRET);
//     const bookings = await Booking.find({ user: decode.id }).populate('place');
//     res.status(200).json(bookings);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = { createBooking, getUserBookings };
const Booking = require("../Models/Booking");

const createBooking = async (req, res) => {
  const userId = req.userId; // From verifyToken middleware
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;

  try {
    const booking = await Booking.create({
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price,
      user: userId,
    });
    res.status(201).json(booking);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Booking creation failed", error: error.message });
  }
};

const getUserBookings = async (req, res) => {
  const userId = req.userId;
  try {
    const bookings = await Booking.find({ user: userId }).populate("place");
    res.status(200).json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch bookings", error: error.message });
  }
};

const deleteBooking = async (req, res) => {
  const userId = req.userId;
  const bookingId = req.params.id;

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
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete booking", error: error.message });
  }
};

module.exports = { createBooking, getUserBookings, deleteBooking };
