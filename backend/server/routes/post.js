const express = require("express");
const fs = require("fs");
const router = express.Router();

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
};
router.use(timeLog);

var posts;

fs.readFile("fake-db/posts.json", "utf8", function (err, data) {
  if (err) throw err;
  posts = JSON.parse(data);
});

var users;

fs.readFile("fake-db/users.json", "utf8", function (err, data) {
  if (err) throw err;
  users = JSON.parse(data);
});

router.get("/posts", (req, res) => {
  for (let i = 0; i < posts.length; i++) {
    posts[i] = {
      ...posts[i],
      user: users.find((u) => u.id === posts[i].userId),
    };
  }
  res.json(posts);
});

router.get("/post/:id", (req, res) => {
  const id = req.params.id;

  let post = posts.find((p) => p.id == id);

  post = { ...post, user: users.find((u) => u.id === post.userId) };

  if (post) {
    res.json(post);
  } else {
    res.status(404).send("Post not found!");
  }
});

router.get("/posts/:page", (req, res) => {
  let perPage = 10;
  const pageCount = Math.ceil(posts.length / perPage);
  let page = +req.params.page || 1;

  if (page > pageCount) page = pageCount;

  for (let i = 0; i < posts.length; i++) {
    posts[i] = {
      ...posts[i],
      user: users.find((u) => u.id === posts[i].userId),
    };
  }

  res.json({
    page: page,
    pageCount: pageCount,
    posts: posts.slice(page * perPage - perPage, page * perPage),
  });
});

module.exports = router;
