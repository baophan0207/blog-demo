const express = require("express");
const fs = require("fs");
const router = express.Router();

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
};
router.use(timeLog);

var comments;

fs.readFile("fake-db/comments.json", "utf8", function (err, data) {
  if (err) throw err;
  comments = JSON.parse(data);
});

router.get("/comments", (req, res) => {
  res.json(comments);
});

router.get("/comments/:id", (req, res) => {
  const id = req.params.id;

  const postComments = comments.filter((c) => c.postId == id);

  if (postComments) {
    res.json(postComments);
  } else {
    res.status(404).send("Post does not have comments!");
  }
});

module.exports = router;
