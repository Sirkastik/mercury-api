const { Router } = require("express");
const multer = require("multer");
const {
  uploadSingle,
  uploadMultiple,
  deleteFile,
} = require("../services/file-manager");

const router = Router();

// Setting up multer as a middleware to grab photo uploads
const storage = multer.memoryStorage();
// POST - Add Image to Cloud Storage
router.post("/upload", multer({ storage }).single("file"), uploadSingle);

router.post("/uploads", multer({ storage }).array("files"), uploadMultiple);

router.delete("/:fileName", deleteFile);

module.exports = () => ({ router });
