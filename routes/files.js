const { Router } = require("express");
const multer = require("multer");
const {
  uploadSingle,
  uploadMultiple,
  deleteFile,
} = require("../services/file");

const router = Router();

// Setting up multer as a middleware to grab photo uploads
const storage = multer.memoryStorage();
const uploadOne = multer({ storage }).single("file");
const uploadMany = multer({ storage }).array("files");
// POST - Add Image to Cloud Storage
router.post("/upload", uploadOne, uploadSingle);

router.post("/uploads", uploadMany, uploadMultiple);

router.delete("/:fileName", async (req, res) => {
//   const fileName = src.split("?")[0].split("/o/")[1].replace("%2F", "/");
  await deleteFile(req.params.fileName);
  res.status(204).end();
});

module.exports = router;
