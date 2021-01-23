// Création des modèles Comment
const db = require('./db');

const Commentaire = function(commentaire) {
    this.comment=commentaire.comment
}

// Créer un commentaire
Commentaire.create = (newCommentaire, result) => {
    db.query("INSERT INTO comments SET ?", newCommentaire, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, {
                id:res.id,
                ...newCommentaire
            })
        }
    })
};

// Modifier un commentaire
Commentaire.modify = (newCommentaire, result) => {
    db.query("UPDATE comments SET comment=? WHERE id=?",
    [newCommentaire=commentaire.comment] ,id, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, {
                id:res.id,
                ...newCommentaire
            })
        }
    })
};

// Supprimer un commentaire
Commentaire.delete = (id, result) => {
    db.query("DELETE comments WHERE id=?", id, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res)
        }
    })
};

module.exports = Commentaire;