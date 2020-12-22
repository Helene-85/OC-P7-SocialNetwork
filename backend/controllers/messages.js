const Message = require('../models/message');
const fs = require('fs');

exports.createMessage = (req, res, next) => {
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

exports.getAllMessages = (req, res, next) => {
    Message.findAll(req.body.content)
    if(err) {
        return res.status(400).json({ message: 'Messages non trouvés' });
    }
    res.status(200).json({
        content: result.content,
        image: result.image
    })
    .catch(error => res.status(500).json({ error : "Erreur serveur" }));
};

exports.getOneMessage = (req, res, next) => {
    Message.findOne(req.params.id)
    if(err) {
        return res.status(400).json({ message: 'Message non trouvé' });
    }
    res.status(200).json({
        content: result.content,
        image: result.image
    })
    .catch(error => res.status(500).json({ error : "Erreur serveur" }));
};

exports.modifyMessage = (req, res, next) => {
    const messageObject = req.file ? 
        {
        ...JSON.parse(sanitize(req.body.message)),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
     Message.modify(req.params.id, { ...messageObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Le message a été modifié !' }))
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteMessage = (req, res, next) => {
    Message.delete(req.params.id)
        .then(message => {
        const filename = message.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            message.deleteOne(req.params.id)
            .then(() => res.status(200).json({ message: 'Le message a été supprimé !'}))
            .catch((error) => res.status(400).json({ error }));
        });
        })
        .catch(error => res.status(500).json({ error }));
};

/* exports.addReactions = (req, res, next) => {
    Message.findOne(req.params.id)
        À METTRE EN PLACE !!
            let newmessage = message;
            newmessage.save();

            return newmessage;
        })
    .then(message => res.status(200).json(message))
    .catch(error => res.status(400).json({error}));
}; */