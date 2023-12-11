const userService = require("../services/user.service");

const addUser = async (req, res) => {
  const { fullName, email, password, admin } = req.body;
  // NOTE:
  //  - Password is not hashed, and there is no authentication;
  //  - so no middlewares and validations are done here just for dummy

  //  verfiy for admin as he is the only one to add the user;
  if (!admin) {
    return res
      .status(401)
      .json({ message: "You are not allowed to add a user!" });
  }

  try {
    // user
    const doesUserExist = await userService.getUserByEmail(email);
    // force single unique email
    if (doesUserExist) {
      return res
        .status(403)
        .json({ message: "User with this email already exists" });
    }
    // then check for admin
    // Rememer we are using demo authentication,
    //  so we need to check them manually, because there is no login on the frontend
    if (
      admin.fullName !== process.env.ADMIN_NAME ||
      admin.email !== process.env.ADMIN_EMAIL ||
      admin.password !== process.env.ADMIN_PASSWORD
    ) {
      return res
        .status(403)
        .json({ message: "You have to be an admin to add another user" });
    }
    const userToSave = {
      fullName,
      email,
      password,
      active: 1,
      type: "user",
    };
    const user = await userService.createUser(userToSave);
    return res.status(201).json({ data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addUser,
  getUsers,
};
