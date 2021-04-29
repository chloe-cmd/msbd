var mysql = require ("mysql");
// Initilalisation de la connexion à la base de donnée
const connection = mysql.createConnection({
    host: "localhost", // host
    user: "root", // user
    password: "", // password
    database : "msbd"
});
module.exports = connection;