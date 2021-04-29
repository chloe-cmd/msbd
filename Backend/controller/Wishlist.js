// Product Controller

const connection = require("../model/config");

exports.index = (req, res) => {
  connection.connect((err) => {
    connection.query("SELECT * FROM wishlist", (err, result) => {
      console.log(result);
      try {
        return res.json(result);
      } catch (err) {
        console.log(err);
      }
    });
  });
};

exports.add = (req, res) => {
  connection.connect((err) => {
    console.log(req.body.produit);
    connection.query(
      "INSERT INTO wishlist(produit) VALUES(?) ",
      req.body.produit,
      (err, result) => {
        console.log(result);
        return res.json({
          message: "Votre produit a bien été ajoutée à la wishlist !",
          id: result.insertId,
          status: 200,
        });
      }
    );
  });
};
exports.getOne = (req, res) => {
  connection.connect((err) => {
    if (req.params.id) {
      console.log(req.params.id);
      connection.query(
        "SELECT * FROM wishlist WHERE produit = ?",
        req.params.id,
        (err, result) => {
          try {
            return res.json({
              status: "200",
              message: "Get product successfully !",
              product: result[0].produit,
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
/*exports.update = (req, res) => {
    connection.connect((err) => {
        const fiche = {
            titre: req.body.titre,
            contenu: req.body.contenu,
            produit: req.body.produits,
            categories: req.body.categories
        };
        if(req.params.id) {
            connection.query(`UPDATE fiche_conseil SET ? WHERE id = ${req.params.id}`, fiche, (err, result) => {
            try {
                return res.json({
                    status: "200",
                    message: "Update fiche successfully !",
                    data: result
                })
            } catch (err) {
                res.json({
                    status: "error",
                    message: err
                })
            }
        });
        }
    })
};*/

exports.delete = (req, res) => {
  connection.connect((err) => {
    if (req.params.id) {
      connection.query(
        "DELETE FROM wishlist WHERE produit = ?",
        req.params.id,
        (err, result) => {
          try {
            return res.json({
              status: "200",
              message: "Delete product successfully !",
              data: result,
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
