const express = require('express');
const mysql = require('mysql');
require('dotenv').config()

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

// Création table
/*
app.get('createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), content VARCHAR(500), attachment VARCHAR(255), likes INT, PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Table posts créée');
    });
})
*/

// Création d'un post
/*
app.get('addpost', (req, res) => {
    let post = {title: '', content: '', attachment: '', likes: ''};
    let sql = 'INSERT INTO posts SET ?';  // le ? est comme un placeholder
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post ajouté');
    });
});
*/

// Sélectionner tous les posts
/*
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Tous les posts sont récupérés');
    });
});
*/

// Sélectionner un unique post
/*
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post récupéré');
    });
});
*/

// Màj d'un post
/*
app.get('/updatepost/:id', (req, res) => {
    let updatedPost = {
        newTitle: '';
        newContent: '';
        newAttachement: '';
    }
    let sql = `UPDATE post SET post = ${updatedPost} WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post modifié');
    });
});
*/

// Surrpimer un post
/*
app.get('/deletepost/:id', (req, res) => {
    let sql = `DELETE FROM post WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post supprimé');
    });
});
*/

app.listen('3000', () =>{
    console.log('Serveur démarré sur le port 3000');
});