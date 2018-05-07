const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const usersGet = require("./routes/users-get");
const usersInitialise = require("./routes/users-initialise");
const usersTransaction = require("./routes/users-transaction");

//  get all the current users
app.get("/users", usersGet);
app.get("/users/initialise", usersInitialise);
app.post("/users/transaction", jsonParser, usersTransaction);

app.listen(8000);
