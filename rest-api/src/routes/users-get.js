const { getUsers } = require("../users");

module.exports = (req, res) => {
  getUsers()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
};
