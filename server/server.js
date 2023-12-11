require("dotenv").config();
const express = require("express");
const cors = require("cors");
// routes
const uploadRouter = require("./routes/upload.routes");
const usersRouter = require("./routes/users.routes");
// databse models and configs
const sequelize = require("./config/db");
const { Umzug, SequelizeStorage } = require("umzug");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
// routes
app.get("/", (req, res) => res.send("Welcome to click-fit server"));
app.use("/api", uploadRouter);
app.use("/vi", usersRouter);
// access images uploaded
app.use("/click-fit-images", express.static("upload_images"));

//  run seeds and migrations
const migrations = new Umzug({
  migrations: { glob: "migrations/*.js" },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

// migrate , seed the db and  start server
(async () => {
  try {
    await migrations.up();
    console.log("users tables create successfully!");
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
})();
