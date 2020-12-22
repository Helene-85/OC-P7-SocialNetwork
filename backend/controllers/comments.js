const Commentaire = require('../models/comment');

exports.createComment = (req, res, next) => {
    Commentaire.create(commentaire, (err, data) => {
        if(err) {
            return res.status(400).json({ message: "Échec de la créstion du commentaire" });
          } 
          res.send(data);
    })
    .catch(error => res.status(500).json({ error : "Erreur serveur" }));
};

exports.modifyComment = (req, res, next) => {
    commentaire.modify(req.body.comment, (err, data) => {
        if(err) {
          return res.status(400).json({ message: 'Commentaire non modifié' });
        } 
        res.send(data);
      })
    .catch(error => res.status(500).json({ error : "Erreur serveur" }));
};

exports.deleteComment = (req, res, next) => {
    commentaire.delete(req.body.comment, (err, data) => {
        if(err) {
          return res.status(400).json({ message: 'Commentaire non supprimé' });
        } 
        res.send(data);
      })
    .catch(error => res.status(500).json({ error : "Erreur serveur" }));
};