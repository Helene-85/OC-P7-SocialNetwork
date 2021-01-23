// Création des modèles Message
const db = require('./db');

const Message = function(message) {
    this.content=message.content,
    this.image=message.image
}

// Créer un message
Message.create = (newMessage, result) => {
    db.query("INSERT INTO messages SET ?", newMessage, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, {
                id:res.id,
                ...newMessage
            })
        }
    })
};

// Trouver un message
Message.findOne = (id, result) => {
    db.query("SELECT * FROM messages WHERE id=?", id, (err, res) => {
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
    db.query("SELECT * FROM messages", (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res)
        }
    })
};

// Modifier un message
Message.modify = (newMessage, result) => {
    db.query("UPDATE messages SET content=?, image=? WHERE id=",
    [newMessage.content, newMessage.image], id, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, {
                id:res.id,
                ...newMessage
            })
        }
    })
};

// Supprimer un message
Message.delete = (id, result) => {
    db.query("DELETE messages WHERE id=?", id, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res)
        }
    })
};

module.exports = Message;