const db = require("./db");

const transactionsCollection = "transactions";

//  ----------------------------------------------------------------------------
//  get all existing transactions
const getTransactions = async () => {
  const mainDb = await db.getMainDb();
  return mainDb
    .collection(transactionsCollection)
    .find({})
    .toArray();
};

//  ----------------------------------------------------------------------------
//  a reset function to delete all existing transactions
const resetTransactions = async () => {
  const mainDb = await db.getMainDb();
  // remove all existing users
  await mainDb.collection(transactionsCollection).deleteMany({});
};

//  ---------------------------------------------------------------------------
module.exports = { getTransactions, resetTransactions };
