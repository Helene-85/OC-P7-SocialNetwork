const db = require('./db');

const User = function(user) {
    this.pseudo=user.pseudo,
    this.email=user.email,
    this.password=user.password,
    this.profilPic=user.profilPic,
    this.isAdmin=user.isAdmin
}

User.create = (newUser, result) => {
    db.query("INSERT INTO users SET ?", newUser, (err, res) => {
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

User.findOne = (email, result) => {
    db.query("SELECT * FROM users WHERE email=?", email, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } 
        result(null, res[0])
    })
};

User.findAll = (req, result) => {
    db.query("SELECT * FROM users", (err, res) => {
        if(err) {
            result(err, null);
            return;
        } 
        result(null, res)
    })
};

User.modify = (newUser, result) => {
    db.query("UPDATE users SET pseudo=?, email=?, password=?, profilPic=?, isAdmin=? WHERE id=?", 
    [newUser.pseudo, newUser.email, newUser.password, newUser.profilPic, newUser.isAdmin], id, (err, res) => {
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

User.delete = (id, result) => {
    db.query("DELETE users WHERE id=?", id, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res)
        }
    })
};
