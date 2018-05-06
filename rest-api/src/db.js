// Connection URL
const { mongoConfig } = require("./config");
const MongoClient = require("mongodb").MongoClient;

//  a buffer variable to hold the mongo connection
let _mainDb;

//  return the main Mongo DB
const getMainDb = () => {
  if (_mainDb !== undefined) {
    return Promise.resolve(_mainDb);
  } else {
    return new Promise(function(resolve, reject) {
      // Connect using MongoClient
      MongoClient.connect(mongoConfig.url, function connectCallback(
        err,
        client
      ) {
        if (err) {
          reject(err);
        } else {
          _mainDb = client.db(mongoConfig.dbName);
          resolve(_mainDb);
        }
      });
    });
  }
};

module.exports = { getMainDb };
