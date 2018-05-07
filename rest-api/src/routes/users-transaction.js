const { makeTransaction } = require("../users");

module.exports = (req, res) => {
  const { from, to, amount } = req.body;

  makeTransaction({ from, to, amount })
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      console.error(err);
      res.status(500).end(err.message);
    });
};
