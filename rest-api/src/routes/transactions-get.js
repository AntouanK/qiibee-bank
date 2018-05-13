const { getTransactions } = require("../transactions");

module.exports = (req, res) => {
  getTransactions()
    .then(res.json.bind(res))
    .catch(err => {
      console.error(err);
      res.status(500).end(err.message);
    });
};
