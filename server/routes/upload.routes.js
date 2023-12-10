const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload_images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(
      null,
      file.originalname.split(".")[0] +
        "-" +
        uniqueSuffix +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
// ulpoad images
router.post("/upload", upload.array("images"), (req, res) => {
  res.send({ message: "Files uploaded successfully." });
});

// get images
router.get("/images", (req, res) => {
  const directoryPath = path.join(__dirname, "../upload_images");
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: "Unable to scan files!" });
    }
    res.send({ message: "Ok", images: files });
  });
});

module.exports = router;
