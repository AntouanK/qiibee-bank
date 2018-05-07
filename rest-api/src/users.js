const db = require("./db");

//  the collection name for the db
const usersCollection = "users";

const defaultUsers = [
  { _id: "7cf3d0fa2c8b990012fb5a21", username: "john doe", balance: 500 },
  {
    _id: "5af009c7fe2b990012fb5a20",
    username: "satoshi nakamoto",
    balance: 100
  }
];

//  ----------------------------------------------------------------------------
//  get all existing users
const getUsers = async () => {
  const mainDb = await db.getMainDb();
  const users = mainDb
    .collection(usersCollection)
    .find({})
    .toArray();

  return users;
};

//  ----------------------------------------------------------------------------
//  a reset function to delete all existing users ( if any ) and add
//  the default ones.
const initialiseUsers = async () => {
  const mainDb = await db.getMainDb();
  // remove all existing users
  await mainDb.collection(usersCollection).deleteMany({});
  // add default users and return them
  const insertResult = await mainDb
    .collection(usersCollection)
    .insertMany(defaultUsers);
  return insertResult.ops;
};

//  ----------------------------------------------------------------------------
// make a transaction between two users
const makeTransaction = ({ from, to, amount }) => {};

//  ---------------------------------------------------------------------------
module.exports = { getUsers, initialiseUsers };
