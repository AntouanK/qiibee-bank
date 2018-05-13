const db = require("./db");
const { resetTransactions } = require("./transactions");

//  the collection name for the db
const usersCollection = "users";
const transactionsCollection = "transactions";

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
  return mainDb
    .collection(usersCollection)
    .find({})
    .toArray();
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

  await resetTransactions();

  return insertResult.ops;
};

//  ----------------------------------------------------------------------------
// make a transaction between two users
const makeTransaction = async ({ from, to, amount }) => {
  const mainDb = await db.getMainDb();

  const fromUser = await mainDb
    .collection(usersCollection)
    .findOne({ _id: from });

  if (fromUser === null) {
    return Promise.reject(
      new Error('transaction is not possible. user "from" does not exist')
    );
  } else if (fromUser.balance < amount) {
    return Promise.reject(
      new Error("transaction is not possible. not enough balance")
    );
  }

  const toUser = await mainDb.collection(usersCollection).findOne({ _id: to });

  if (toUser === null) {
    return Promise.reject(
      new Error('transaction is not possible. user "to" does not exist')
    );
  }

  //   add transaction
  await mainDb
    .collection(transactionsCollection)
    .insert({ from, to, amount, at: Date.now() });

  await mainDb
    .collection(usersCollection)
    .updateOne({ _id: from }, { $set: { balance: fromUser.balance - amount } });
  await mainDb
    .collection(usersCollection)
    .updateOne({ _id: to }, { $set: { balance: toUser.balance + amount } });
};

//  ---------------------------------------------------------------------------
module.exports = { getUsers, initialiseUsers, makeTransaction };
