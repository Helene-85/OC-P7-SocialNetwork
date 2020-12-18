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

User.modify = (newUser, result) => {
    db.query("UPDATE INTO users SET ?", newUser, (err, res) => {
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

User.delete = (newUser, result) => {
    db.query("DELETE INTO users SET ?", newUser, (err, res) => {
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