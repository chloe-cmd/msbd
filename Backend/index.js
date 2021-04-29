const express = require('express');
const app = express();
require('./model/config');
const api = require('./router/index')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
// initialiser notre serveur
app.listen(5000, ()=> console.log('Server started: 5000'));

// utilisation du controller via le router
app.use("/api", api)
