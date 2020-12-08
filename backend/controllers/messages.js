const Message = require('../models/message');
const fs = require('fs');

// Création d'un message
/*
app.get('/addmessage', (req, res) => {
    let message = {title: '', content: '', attachment: '', likes: ''};
    let sql = 'INSERT INTO messages SET ?';  // le ? est comme un placeholder
    let query = db.query(sql, message, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('message ajouté');
    });
});
*/

// Sélectionner tous les messages
/*
app.get('/getmessages', (req, res) => {
    let sql = 'SELECT * FROM messages';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Tous les messages sont récupérés');
    });
});
*/

// Sélectionner un unique message
/*
app.get('/getmessage/:id', (req, res) => {
    let sql = `SELECT * FROM messages WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('message récupéré');
    });
});
*/

// Màj d'un message
/*
app.get('/updatemessage/:id', (req, res) => {
    let updatedmessage = {
        newTitle: '';
        newContent: '';
        newAttachement: '';
    }
    let sql = `UPDATE message SET message = ${updatedmessage} WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('message modifié');
    });
});
*/

// Surrpimer un message
/*
app.get('/deletemessage/:id', (req, res) => {
    let sql = `DELETE FROM message WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('message supprimé');
    });
});
*/

// Mise en place CRUD
exports.createMessage = (req, res, next) => {                                       // CREATE
    const messageObject = JSON.parse(req.body.message);
    delete messageObject._id;
    const message = new message({
        ...messageObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    message.save()
        .then(() => res.status(201).json({ message: 'Nouveau message créé !' }))
        .catch((error) => res.status(400).json({ error }));
};

exports.getAllMessages = (req, res, next) => {                                      // READ
    Message.find()
        .then((messages) => res.status(200).json(messages))
        .catch((error) => res.status(400).json({ error }));
};

exports.getOneMessage = (req, res, next) => {
    Message.findOne({_id: req.params.id})
        .then((message) => {res.status(200).json(message);
        })
        .catch((error) => {res.status(404).json({ error: error});
        });
};

exports.modifyMessage = (req, res, next) => {                                       // UPDATE
    const messageObject = req.file ? 
        {
        ...JSON.parse(sanitize(req.body.message)),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
     Message.updateOne({ _id: req.params.id }, { ...messageObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Le message a été modifié !' }))
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteMessage = (req, res, next) => {                                       // DELETE
    Message.findOne({ _id: req.params.id })
        .then(message => {
        const filename = message.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            message.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Le message a été supprimé !'}))
            .catch((error) => res.status(400).json({ error }));
        });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.addLikeDislike = (req, res, next) => {
    Message.findOne({ _id: req.params.id })
        .then(message => {
            const userId = req.body.userId;
            let userWantsToLike = (req.body.like === 1);
            let userWantsToDislike = (req.body.like === -1);
            let userWantsToCancel = (req.body.like === 0);
            const userCanLike = (!message.usersLiked.includes(userId));
            const userCanDislike = (!message.usersDisliked.includes(userId));
            const notTheFirstVote = (message.usersLiked.includes(userId) || message.usersDisliked.includes(userId));

            if (userWantsToLike && userCanLike) {
                 message.usersLiked.push(userId)
            }

            if (userWantsToCancel && notTheFirstVote) {
                if (userCanLike) {
                // enlever le like de l'utlisateur
                let index = message.usersDisliked.indexOf(userId)
                message.usersDisliked.splice(index, 1)
                }
                if (userCanDislike) {
                // enlever le dislike de l'utilisateur
                let index = message.usersLiked.indexOf(userId)
                message.usersLiked.splice(index, 1)
                }
            }

            if (userWantsToDislike && userCanDislike) {
                message.usersDisliked.push(userId)
            }
            message.likes = message.usersLiked.length
            message.dislikes = message.usersDisliked.length
            let newmessage = message;
            newmessage.save();

            return newmessage;
        })
    .then(message => res.status(200).json(message))
    .catch(error => res.status(400).json({error}));
};