const express = require('express');
const bodyParser = require('body-parser');            // Importation du package body-parser
const path = require('path');                         // Importation du package mongoose-path
const helmet = require('helmet');                     // Importation du package helmet


const messageRoutes = require("./routes/messages");
const userRoutes = require("./routes/user");

const app = express();

//CORS error
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());                                                // Définition de la fonction json comme middleware global
app.use(bodyParser.urlencoded({extended: true}));                           // content-type: application/x-www-form-urlencoded
app.use('/images', express.static(path.join(__dirname, 'images')));        // Gestiion de la source de manière statique grâce à Express
app.use(helmet());                                                          // Activation de la protection Helmet : équivaut à 11 protections
app.use("/api/messages", messageRoutes);                                    // L'application utilise le endpoint /api/messages pour les routes messageRoutes
app.use("/api/auth", userRoutes);                                           // L'application utilise le endpoint /api/auth pour les routes userRoutes
module.exports = app;