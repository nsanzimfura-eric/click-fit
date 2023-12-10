const express = require("express");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload_images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.array("images"), (req, res) => {
  console.log("Files received:", req.files);
  res.send({ message: "Files uploaded successfully." });
});

module.exports = router;
