// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const posts = require('./routes/post')
const users = require('./routes/user')
const comments = require('./routes/comment')

app.use('/', posts);
app.use('/', users);
app.use('/', comments);

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
