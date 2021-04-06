// Création des modèles Message
const db = require('./db');

const Message = function(message) {
    this.user_id=message.user_id,
    this.content=message.content,
    this.image=message.image,
    this.createdAt=message.createdAt,
    this.updatedAt=message.updatedAt,
    this.isActive=!!message.isActive
}

// Créer un message
Message.create = (newMessage, result) => {
    let statment = `INSERT 
                    INTO messages 
                    SET ?`;
    db.query(statment, newMessage, (err, res) => {
        if(err) {
            result(err, null);
            return;
        }
        result(null, {
            id:res.id,
            ...newMessage
        })
    })
};

// Trouver un message
Message.findOne = (id, result) => {
    db.query(`SELECT * 
              FROM messages 
              WHERE id=?
              AND isActive=true`, 
              id, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res[0])
        }
    })
};

// Récupérer le dernier message
Message.getLatest = (id, result) => {
    db.query(`SELECT * 
              FROM messages
              WHERE isActive=true 
              ORDER BY id 
              DESC 
              LIMIT 0,1`, 
              (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res[0])
        }
    })
};

// Trouver tous les message
Message.findAll = (result) => {
    db.query(`SELECT messages.*, 
              users.pseudo, users.profilPic 
              FROM messages 
              JOIN users 
              ON users.id = messages.user_id
              WHERE messages.isActive=true
              ORDER BY messages.id 
              DESC`, 
              (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res)
        }
    })
};

// Trouver tous les messages avec commentaires
Message.findAllWithComments = (result) => {
    db.query(`SELECT messages.*, 
              users.pseudo, users.profilPic, 
              comments.id AS comment_id, 
              user_comment.pseudo AS comment_pseudo, 
              comments.comment AS comment_content
              FROM messages 
              LEFT JOIN users ON messages.user_id = users.id
              LEFT JOIN comments ON messages.id = comments.message_id
              LEFT JOIN users AS user_comment ON comments.user_id = user_comment.id
              WHERE messages.isActive=true 
              ORDER BY messages.id DESC;`, 
              (err, res) => {
        if(err) {
            result(err, null);
        } else {
            result(null, res)
        }
    })
};

// Supprimer un message
Message.delete = (id, result) => {
    db.query(`UPDATE messages
              SET isActive=0 
              WHERE id=?`, 
              id, (err, res) => {
        if(err) {
            result(err, null);
        } else {
            result(null, res)
        }
    })
};

// Trouver le type de réactions
Message.findReactionType = (id, result) => {
    db.query(`SELECT * 
              FROM reaction_type_id 
              WHERE id=?`, 
              id, (err, res) => {
        if(err) {
            result(err, null);
        } 
        else {
            result(null, res);
        }
    });
};

// Trouver une réction
Message.findReaction = (reaction, result) => {
    db.query(`SELECT * 
        FROM message_reaction_user
        WHERE message_id=?
        AND user_id=?`,
        [reaction.message_id, reaction.user_id], (err, res) => {
        if(err) {
            result(err, null);
        } 
        else {
            result(null, res);
        }
    });
};

// Trouver toutes les réactions
Message.findAllReaction = (result) => {
    db.query(`SELECT message_id, reaction_id, COUNT(*) AS sumReaction
              FROM message_reaction_user
              GROUP BY message_id, reaction_id
              ORDER BY message_id DESC;`, 
              (err, res) => {
        if(err) {
          result(err, null);
        } else {
          result(null, res)
        }
    })
};

// Ajouter une réaction
Message.addReaction = (newReaction, result) => {
    let statment = `INSERT 
                    INTO message_reaction_user 
                    SET ?`;
    db.query(statment, newReaction, (err, res) => {
        if(err) {
            console.log(err);
            result(err, null);
        }
        result(null, null);
    })
};

// Modifier la réaction dun message
Message.updateReaction = (newReaction, result) => {
    db.query(`UPDATE message_reaction_user
              SET reaction_id=?
              WHERE message_id=?
              AND user_id=?`, 
              [newReaction.reaction_id, newReaction.message_id, newReaction.user_id], (err, res) => {
        if(err) {
            result(err, null);
        } else {
            result(null, res)
        }
    })
};

module.exports = Message;