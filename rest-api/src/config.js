"use strict";

const Consologger = require("consologger");
const logger = new Consologger();

//  ------------------------------------------------  MongoDB
const mongoHost = process.env.MONGO_HOST;
const mongoPort = +process.env.MONGO_PORT;
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoDbName = "arb-tools";
const f = require("util").format;
const mongoUrl = f(
  "mongodb://%s:%s@%s:%s/%s?authSource=%s",
  encodeURIComponent(mongoUser),
  encodeURIComponent(mongoPassword),
  mongoHost,
  mongoPort,
  mongoDbName,
  "admin"
);

if (typeof mongoHost !== "string") {
  throw new Error("no MONGO host defined");
}
if (!(mongoPort > 0)) {
  throw new Error("no MONGO port defined");
}
const mongoConfig = {
  url: mongoUrl,
  dbName: mongoDbName
};

logger
  .grey("[ config ]")
  .white("\nmongoUrl", mongoUrl)
  .print();

//  ------------------------------------------------  export
module.exports = { mongoConfig };
