const express = require("express");
const app = express();

const usersGet = require("./routes/users-get");
const usersInitialise = require("./routes/users-initialise");

//  get all the current users
app.get("/users", usersGet);
app.get("/users/initialise", usersInitialise);

app.listen(8000);
