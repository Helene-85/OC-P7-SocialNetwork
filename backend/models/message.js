// Création des modèles Message
const db = require('./db');

const Message = function(message) {
    this.user_id=message.user_id,
    this.content=message.content,
    this.image=message.image,
    this.createdAt=message.createdAt,
    this.updatedAt=message.updatedAt
}

// Créer un message
Message.create = (newMessage, result) => {
    let statment = `INSERT 
                    INTO messages 
                    SET ?`;
    db.query(statment, newMessage, (err, res) => {
        if(err) {
            console.log(err);
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
              WHERE id=?`, 
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
              ORDER BY messages.id DESC;`, 
              (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res)
        }
    })
};

Message.getAllComments = (id, result) => {
    db.query(`SELECT * 
              FROM comments 
              WHERE message_id=? 
              ORDER BY comments.id 
              DESC`, 
              id, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res)
        }
    })
};

// Supprimer un message
Message.delete = (id, result) => {
    db.query(`DELETE 
              FROM messages 
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

// Supprimer tous les messages d\'un user précis
Message.deleteAllBy = (id, result) => {
    db.query(`DELETE * 
              FROM comments 
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

module.exports = Message;