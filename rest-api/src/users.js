const db = require("./db");

const getUsers = async () => {
  const mainDb = await db.getMainDb();
  const users = mainDb
    .collection("users")
    .find({})
    .toArray();

  return users;
};

module.exports = { getUsers };
