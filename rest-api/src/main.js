const express = require("express");
const app = express();

const { getUsers } = require("./users");

//  get all the current users
app.get("/users", (req, res) => {
  getUsers()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
});

app.listen(8000);
