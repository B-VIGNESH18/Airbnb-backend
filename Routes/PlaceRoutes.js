// const express = require('express');
// const PlaceController = require('../Controllers/PlaceController');
// const AuthMiddleware = require('../Middleware/AuthMiddleware.js');
// const upload = require('../Middleware/MulterMiddleware');

// const router = express.Router();

// router.post('/', AuthMiddleware, PlaceController.createPlace);
// router.get('/', PlaceController.getAllPlaces);
// router.get('/user', AuthMiddleware, PlaceController.getUserPlaces);
// router.get('/:id', PlaceController.getPlaceById);
// router.put('/', AuthMiddleware, PlaceController.updatePlace);
// router.post('/upload-link', AuthMiddleware, PlaceController.uploadByLink);
// router.post('/upload-images', AuthMiddleware, upload.array('photos', 10), PlaceController.uploadMultipleImages);

// module.exports = router;
// Routes/PlaceRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const verifyToken = require("../Middleware/verifyToken");
const PlaceController = require("../Controllers/PlaceController");

// Setup Multer storage (example)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes

// Create new place - Protected route
router.post("/", verifyToken, PlaceController.createPlace);

// Get all places - public
router.get("/", PlaceController.getAllPlaces);

// Get places by logged-in user - Protected route
router.get("/user-places", verifyToken, PlaceController.getUserPlaces);

// Get place by id - public
router.get("/:id", PlaceController.getPlaceById);

// Update place - Protected route
router.put("/", verifyToken, PlaceController.updatePlace);

// Upload images by link - Protected route
router.post("/upload-by-link", verifyToken, PlaceController.uploadByLink);

// Upload multiple images - Protected route
router.post(
  "/upload-images",
  verifyToken,
  upload.array("photos", 10), // "photos" is field name in form-data, max 10 files
  PlaceController.uploadMultipleImages
);

module.exports = router;
