// Product Controller

const connection = require("../model/config");

exports.index = (req, res) => {
  connection.connect((err) => {
    connection.query("SELECT * FROM produits", (err, result) => {
      console.log(result);
      try {
        return res.json(result);
      } catch (err) {
        console.log(err);
      }
    });
  });
};
exports.getOne = (req, res) => {
  connection.connect((err) => {
    if (req.params.id) {
      connection.query(
        "SELECT * FROM produits WHERE id = ?",
        req.params.id,
        (err, result) => {
          try {
            return res.json({
              status: "200",
              message: "Get product successfully !",
              data: result[0].nom,
            });
          } catch (err) {
            res.json({
              status: "error",
              message: err,
            });
          }
        }
      );
    }
  });
};
