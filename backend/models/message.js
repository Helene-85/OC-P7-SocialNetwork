const db = require('./db');

const Publication = function(publication) {
    this.message=publication.message,
    this.image=publication.image
}

Publication.create = (newPublication, result) => {
    db.query("INSERT INTO messages SET ?", newPublication, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, {
                id:res.id,
                ...newPublication
            })
        }
    })
};

Publication.modify = (newPublication, result) => {
    db.query("UPDATE INTO messages SET ?", newPublication, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, {
                id:res.id,
                ...newPublication
            })
        }
    })
};

Publication.delete = (newPublication, result) => {
    db.query("DELETE INTO messages SET ?", newPublication, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, {
                id:res.id,
                ...newPublication
            })
        }
    })
};