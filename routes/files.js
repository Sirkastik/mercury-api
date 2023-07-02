const { Router } = require("express");
const multer = require("multer");
const { uploadfile } = require("../services/file");

const router = Router();

// Setting up multer as a middleware to grab photo uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("file");
// POST - Add Image to Cloud Storage
router.post("/upload", upload, uploadfile);

module.exports = router;
