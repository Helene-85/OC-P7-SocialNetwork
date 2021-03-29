// Création des modèles User
const db = require('./db');
const Utils = require('../libs/utils.js');

const User = function(user) {
    this.pseudo=user.pseudo,
    this.email=user.email,
    this.password=user.password,
    this.profilPic=user.profilPic,
    this.isAdmin=!!user.isAdmin,
    this.isActive=!!user.isActive
}

// Création d\'un user
User.create = (newUser, result) => {
    db.query(`INSERT 
              INTO users 
              SET ?`, 
              newUser, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, {
                id:res.id,
                ...newUser
            })
        }
    })
};

// Trouver un user via son email
User.findOneByEmail = (email, result) => {
    db.query(`SELECT * 
              FROM users 
              WHERE email=?
              AND isActive=true`, 
              email, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } 
        result(null, res[0])
    })
};

// Trouver un user via son id
User.findOneById = (id, result) => {
    db.query(`SELECT * 
              FROM users 
              WHERE id=?
              AND isActive=true`, 
              id, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } 
        result(null, res[0])
    })
};

// Trouver tous les users dans la BDD
User.findAll = (result) => {
    db.query(`SELECT * 
              FROM users
              WHERE isActive=true`, 
              (err, res) => {
        if(err) {
            result(err, null);
            return;
        } 
        result(null, res)
    })
};

// Modifier un user
User.modifyPseudo = (user, result) => {
    db.query(`UPDATE users 
              SET pseudo=? 
              WHERE id=?
              AND isActive=true`, 
              [user.pseudo, user.id], (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res)
        }
    })
};

// Modifier un user
User.modifyProfilPic = (user, result) => {
    db.query(`UPDATE users 
              SET profilPic=? 
              WHERE id=?
              AND isActive=true`, 
              [user.profilPic, user.id], (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res)
        }
    })
};

// Supprimer un user
User.deactivate = (id, result) => {
    db.query(`UPDATE users
              SET isActive=false
              WHERE id=?`, 
              id, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res)
        }
    })
};

 module.exports = User;