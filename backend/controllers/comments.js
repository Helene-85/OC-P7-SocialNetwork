const Comment = require('../models/comment');
const fs = require('fs');

// Mise en place CRUD
exports.createComment = (req, res, next) => {                                       // CREATE
    const commentObject = JSON.parse(req.body.comment);
    delete commentObject._id;
    const comment = new comment({
        ...commentObject,
    });
    comment.save()
        .then(() => res.status(201).json({ message: 'Nouveau commentaire posté !' }))
        .catch((error) => res.status(400).json({ error }));
};

exports.getAllComments = (req, res, next) => {                                      // READ
    Comment.find()
        .then((comments) => res.status(200).json(comments))
        .catch((error) => res.status(400).json({ error }));
};

exports.getOneComment = (req, res, next) => {
    Comment.findOne({_id: req.params.id})
        .then((comment) => {res.status(200).json(comment);
        })
        .catch((error) => {res.status(404).json({ error: error});
        });
};

exports.modifyComment = (req, res, next) => {                                       // UPDATE
    const commentObject = req.file ? 
        {
        ...JSON.parse(sanitize(req.body.comment)),
        } : { ...req.body };
     Comment.updateOne({ _id: req.params.id }, { ...commentObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Le commentaire a été modifié !' }))
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {                                       // DELETE
    comment.findOne({ _id: req.params.id })
        .then(comment => {
            comment.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Le commentaire a été supprimé !'}))
            .catch((error) => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};