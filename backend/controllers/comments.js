const Commentaire = require('../models/comment');

exports.createComment = (req, res, next) => {
  const commentaire = ({
    comment: ''
  })
    Commentaire.create(commentaire, (err, data) => {
        if(err) {
            return res.status(400).json({ message: "Impossible de créer le commentaire" });
          } 
          res.send(data);
    })
    .catch(error => res.status(500).json({ error : "Erreur serveur" }));
};

exports.updateComment = (req, res, next) => {
    commentaire.modify(req.body.comment, (err, data) => {
        if(err) {
          return res.status(400).json({ message: 'Commentaire non modifié' });
        } 
        res.status(200).json({
          comment: result.comment
        })
      })
    .catch(error => res.status(500).json({ error : "Erreur serveur" }));
};

exports.deleteComment = (req, res, next) => {
    commentaire.delete(req.body.comment, (err, data) => {
        if(err) {
          return res.status(400).json({ message: 'Commentaire non supprimé' });
        } 
        res.status(200).json({ message: 'Le commentaire a été supprimé !'})
      })
    .catch(error => res.status(500).json({ error : "Erreur serveur" }));
};