const express = require("express");
const userController = require("../controllers/users.controller");

const usersRouter = express.Router();

usersRouter.post("/users", userController.addUser);
usersRouter.get("/users", userController.getUsers);

module.exports = usersRouter;
