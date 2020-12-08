const express = require('express');
const bodyParser = require('body-parser');            // Importation du package body-parser
const mysql = require('mysql');
const path = require('path');                         // Importation du package mongoose-path
const helmet = require('helmet');                     // Importation du package helmet

require('dotenv').config()

const messageRoutes = require("./routes/messages");
const userRoutes = require("./routes/user");

// Création de la connexion
const db = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : 'groupomania'
});

// Connection 
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySQL est connecté');
});

const app = express();

// Création database
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE groupomania';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database créée');
    });
});

// Création tables : users, messages, comments, reactions


app.get('/createuserstable', (req, res) => {
    let sql = 'CREATE TABLE users(id int AUTO_INCREMENT, pseudo VARCHAR(55), email VARCHAR(255), password VARCHAR(255), profilPicUrl VARCHAR(255), isAdmin TINYINT(1), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Table users créée');
    });
})

app.get('/createmessagestable', (req, res) => {
    let sql = 'CREATE TABLE messages(id int AUTO_INCREMENT, message TEXT(500), urlImage VARCHAR(255), createdAt DATETIME, updatedAt DATETIME, PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Table messages créée');
    });
})

app.get('/createcommentstable', (req, res) => {
    let sql = 'CREATE TABLE comments(id int AUTO_INCREMENT, pseudo VARCHAR(55), comment TEXT(500), createdAt DATETIME, updatedAt DATETIME, PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Table comments créée');
    });
})

app.get('/createreactionstable', (req, res) => {
    let sql = 'CREATE TABLE reactions(id int AUTO_INCREMENT, PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Table reactions créée');
    });
})

app.listen('3000', () =>{
    console.log('Serveur démarré sur le port 3000');
});

app.use(bodyParser.json());                                                // Définition de la fonction json comme middleware global

app.use('/images', express.static(path.join(__dirname, 'images')));        // Gestiion de la source de manière statique grâce à Express

app.use(helmet());                                                         // Activation de la protection Helmet : équivaut à 11 protections

app.use("/api/messages", messageRoutes);                                   // L'application utilise le endpoint /api/messages pour les routes messageRoutes
app.use("/api/auth", userRoutes);                                          // L'application utilise le endpoint /api/auth pour les routes userRoutes

module.exports = app;