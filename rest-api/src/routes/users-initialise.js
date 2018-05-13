const { initialiseUsers } = require("../users");

module.exports = (req, res) => {
  initialiseUsers()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
};
