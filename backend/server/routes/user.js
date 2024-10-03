const express = require("express");
const fs = require("fs");
const router = express.Router();

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
};
router.use(timeLog);

var users;

fs.readFile("fake-db/users.json", "utf8", function (err, data) {
  if (err) throw err;
  users = JSON.parse(data);
});

router.get("/users", (req, res) => {
  res.json(users);
});

router.get("/users/:id", (req, res) => {
  const id = req.params.id;

  const user = users.find((p) => p.id == id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found!");
  }
});

router.post("/register", (req, res) => {
  const { full_name, email, password } = req.body;
  try {
    // create an instance of a user
    const newUser = {
      id: users.length + 1,
      full_name,
      email,
      password,
    };
    // Check if user already exists
    const existingUser = users.find((u) => u.email === newUser.email);
    if (existingUser)
      return res.status(400).json({
        status: "failed",
        data: [],
        message: "It seems you already have an account, please log in instead.",
      });
    // save new user into the database

    users.push(newUser);
    fs.writeFile("fake-db/users.json", JSON.stringify(users), (err) => {
      // error checking
      if (err) {
        console.log(err);
        return res.status(400).json({
          status: "failed",
          data: [],
          message: "Fail to register user.",
        });
      }
    });
    res.status(200).json({
      status: "success",
      data: newUser,
      message:
        "Thank you for registering with us. Your account has been successfully created.",
    });

    // const { role, ...user_data } = savedUser;
    // if (!savedUser()) {
    //   return res.status(400).json({
    //     status: "failed",
    //     data: [],
    //     message: "Fail to register user.",
    //   });
    // }

    // res.status(200).json({
    //   status: "success",
    //   data: newUser,
    //   message:
    //     "Thank you for registering with us. Your account has been successfully created.",
    // });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal Server Error",
    });
  }
  res.end();
});

router.post("/login", (req, res) => {
  // Get variables for the login process
  // const { email } = req.body;
  try {
    // Check if user exists
    const user = users.find((u) => u.email === req.body.email);
    if (!user)
      return res.status(401).json({
        status: "failed",
        data: [],
        message:
          "Invalid email or password. Please try again with the correct credentials.",
      });
    // if user exists
    // validate password
    const isPasswordValid = () => {
      if (user.password !== req.body.password) return false;
      return true;
    };
    // if not valid, return unauthorized response
    if (!isPasswordValid)
      return res.status(401).json({
        status: "failed",
        data: [],
        message:
          "Invalid email or password. Please try again with the correct credentials.",
      });
    // return user info except password
    const { password, ...user_data } = user;

    res.status(200).json({
      status: "success",
      data: user_data,
      message: "You have successfully logged in.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal Server Error",
    });
  }
  res.end();
});

module.exports = router;
