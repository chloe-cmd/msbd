// Fiches Controller

const connection = require("../model/config");

exports.index = (req, res) => {
  connection.connect((err) => {
    connection.query("SELECT * FROM fiche_conseil", (err, result) => {
      console.log(result);
      try {
        return res.json(result);
      } catch (err) {
        console.log(err);
      }
    });
  });
};

exports.getByCategories = (req, res) => {
  connection.connect((err) => {
    connection.query(
      "SELECT * FROM fiche_conseil WHERE fiche_conseil.categories = ?",
      req.params.categorieId,
      (err, result) => {
        console.log(result);
        try {
          return res.json(result);
        } catch (err) {
          console.log(err);
        }
      }
    );
  });
};

exports.add = (req, res) => {
  const fiche = {
    titre: req.body.titre,
    contenu: req.body.contenu,
    produit: req.body.produit,
    categories: req.body.categorie,
  };
  connection.connect((err) => {
    connection.query(
      "INSERT INTO fiche_conseil SET ?",
      fiche,
      (err, result) => {
        try {
          console.log(result);
          return res.json({
            response: "Votre fiche a bien été ajoutée !",
            status: 200,
          });
        } catch (err) {
          console.log(err);
          return res.json({
            response: "Oops..une erreur est survenue !",
            status: 400,
          });
        }
      }
    );
  });
};
exports.getOne = (req, res) => {
  connection.connect((err) => {
    if (req.params.id) {
      connection.query(
        "SELECT * FROM fiche_conseil WHERE id = ?",
        req.params.id,
        (err, result) => {
          try {
            return res.json({
              status: "200",
              message: "Get fiche successfully !",
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

exports.update = (req, res) => {
  connection.connect((err) => {
    console.log(req.body);
    const fiche = {
      titre: req.body.titre,
      contenu: req.body.contenu,
      produit: req.body.produit,
      categories: req.body.categorie,
    };
    if (req.params.id) {
      connection.query(
        `UPDATE fiche_conseil SET ? WHERE id = ${req.params.id}`,
        fiche,
        (err, result) => {
          try {
            return res.json({
              status: "200",
              message: "Update fiche successfully !",
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

exports.delete = (req, res) => {
  connection.connect((err) => {
    if (req.params.id) {
      connection.query(
        "DELETE FROM fiche_conseil WHERE id = ?",
        req.params.id,
        (err, result) => {
          try {
            return res.json({
              status: "200",
              message: "Votre fiche à été supprimé avec succès !",
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
