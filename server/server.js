const express = require("express");
const uploadRouter = require("./routes/upload.routes");

const app = express();
const port = 8080;

// routes
app.get("/", (req, res) => res.send("Welcome to click-fit server"));
app.use("/api", uploadRouter);
// access images uploaded
app.use("/click-fit-images", express.static("upload_images"));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
