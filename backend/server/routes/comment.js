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

router.get("/comments/:postId/:page", (req, res) => {
  let perPage = 2;
  const id = req.params.postId;
  const postComments = comments.filter((c) => c.postId == id);
  const pageCount = Math.ceil(postComments.length / perPage);
  let page = +req.params.page || 1;

  if (page > pageCount) page = pageCount;

  if (postComments) {
    res.json({
      page: page,
      pageCount: pageCount,
      comments: postComments.slice(0, page * perPage),
    });
  } else {
    res.status(404).send("Post does not have comments!");
  }
});

module.exports = router;
