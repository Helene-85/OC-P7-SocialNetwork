const Commentaire = require('../models/comment');

// Créer un commentaire
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

// Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    Commentaire.delete(req.body.comment, (err, data) => {
        if(err) {
          return res.status(400).json({ message: 'Commentaire non supprimé' });
        } 
        res.status(200).json({ message: 'Le commentaire a été supprimé !'})
      })
    .catch(error => res.status(500).json({ error : "Erreur serveur" }));
};