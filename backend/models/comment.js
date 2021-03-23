// Création des modèles Comment
const db = require('./db');
const Utils = require('../libs/utils.js');

const Comment = function(comment) {
    this.user_id=comment.user_id,
    this.message_id=comment.message_id,
    this.comment=comment.comment,
    this.createdAt=comment.createdAt,
    this.updatedAt=comment.updatedAt
}

// Créer un comment
Comment.create = (newComment, result) => {
    db.query(`INSERT 
              INTO comments 
              SET ?`, 
              newComment, (err, res) => {
        if(err) {
            result(err, null);
            return;
        }
        result(null, res)
    })
};

// Récupérer le dernier commentaire
Comment.latest = (result) => {
    db.query(`SELECT comments.*,
              users.pseudo as pseudo
              FROM comments
              JOIN users ON users.id=comments.user_id
              ORDER BY id
              DESC LIMIT 0,1`, 
              (err, res) => {
        if(err) {
            result(err, null);
            return;
        }
        result(null, res[0])
    })
};

// Récupérer les commentaires par message
Comment.findAllMessageComment = (id, result) => {
    db.query(`SELECT * 
              FROM comments 
              WHERE message_id=?`, 
              id, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res[0])
        }
    })
};

// Supprimer un comment
Comment.delete = (id, result) => {
    db.query(`DELETE FROM comments 
              WHERE id=?`, 
              Number(id), (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res)
        }
    })
};

module.exports = Comment;