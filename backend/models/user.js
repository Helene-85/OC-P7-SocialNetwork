// Création des modèles User
const db = require('./db');
const Utils = require('../libs/utils.js');

const User = function(user) {
    this.pseudo=user.pseudo,
    this.email=user.email,
    this.password=user.password,
    this.profilPic=user.profilPic,
    this.isAdmin=!!user.isAdmin
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
              WHERE email=?`, 
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
              WHERE id=?`, 
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
              FROM users`, 
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
              WHERE id=?`, 
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
              SET pofilPic=? 
              WHERE id=?`, 
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
User.delete = (id, result) => {
    db.query(`DELETE 
              FROM users 
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

// Supprimer un user
User.deleteAll = (id, result) => {
    db.query(`DELETE 
              FROM message_reaction_user 
              WHERE user_id=?`, 
              id, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            // result(null, res);
        }
    });
    db.query(`DELETE 
              FROM comments 
              WHERE user_id=?`, id, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            // result(null, res);
        }
    });
    db.query(`DELETE 
              FROM messages 
              WHERE user_id=?`, 
              id, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            // result(null, res);
        }
    });
    db.query(`DELETE 
              FROM users 
              WHERE id=?`, 
              id, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res);
        }
    });
};

 module.exports = User;