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

module.exports = router;
