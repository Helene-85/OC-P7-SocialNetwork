const db = require('./db');

const Message = function(message) {
    this.content=message.content,
    this.image=message.image
}

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

Message.modify = (newMessage, result) => {
    db.query("UPDATE INTO messages SET ?", newMessage, (err, res) => {
        if(err) {
            result(err, null);
            return;!
        } else {
            result(null, {
                id:res.id,
                ...newMessage
            })
        }
    })
};

Message.delete = (newMessage, result) => {
    db.query("DELETE INTO messages SET ?", newMessage, (err, res) => {
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