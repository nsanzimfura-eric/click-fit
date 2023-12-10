require("dotenv").config();
const express = require("express");
const cors = require("cors");
const uploadRouter = require("./routes/upload.routes");
// databse models and configs
const db = require("./models");
const { Umzug, SequelizeStorage } = require("umzug");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
// routes
app.get("/", (req, res) => res.send("Welcome to click-fit server"));
app.use("/api", uploadRouter);
// access images uploaded
app.use("/click-fit-images", express.static("upload_images"));

//  run seeds and migrations
async function runMigrationsAndSeeders() {
  const migrator = new Umzug({
    migrations: { glob: "migrations/*.js" },
    context: db.sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize: db.sequelize }),
    logger: console,
  });

  const seeder = new Umzug({
    migrations: { glob: "seeders/*.js" },
    context: db.sequelize.getQueryInterface(),
    storage: new SequelizeStorage({
      sequelize: db.sequelize,
      // modelName: "SequelizeData",
    }),
    logger: console,
  });

  // migrate and seed the bd
  await migrator.up();
  await seeder.up();
  console.log("All seeds run successfully!");
}

runMigrationsAndSeeders().then(() => {
  // Start server
  app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`)
  );
});
