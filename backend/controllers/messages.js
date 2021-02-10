const Message = require('../models/message');
const fs = require('fs');

// Créer un message
exports.createMessage = (req, res, next) => {
    const message = new Message ({
        user_id: 1,
        content: req.body.content,
        image: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
        createdAt: '2021-01-09',
        updatedAt: '2021-02-09',
    });
    console.log('message', message)
    Message.create(message, (err, data) => {
      console.log(err);
        if(err) {
          return res.status(400).json({ message: 'Impossible de créer le message' });
        } 
        res.send(data);
    })
};

// Récupérer tous les messages
exports.getAllMessages = (req, res, next) => {
    Message.findAll(req.body.content)
    if(err) {
        return res.status(404).json({ message: 'Messages non trouvés' });
    }
    res.status(200).json({
        content: result.content,
        image: result.image
    })
    .catch(error => res.status(500).json({ error : "Erreur serveur" }));
};

// Récupérer un message
exports.getOneMessage = (req, res, next) => {
    Message.findOne(req.params.id)
    if(err) {
        return res.status(404).json({ message: 'Message non trouvé' });
    }
    res.status(200).json({
        content: result.content,
        image: result.image
    })
    .catch(error => res.status(500).json({ error : "Erreur serveur" }));
};

// Modifier un message
exports.updateMessage = (req, res, next) => {
    Message.modify(req.body.content, req.body.image, (err, result) => {
      if(err) {
        return res.status(400).json({ message: 'Modification non effectuée' });
      }
      res.status(201).json({
        content: result.content,
        image: result.image
      })
    })
    .catch(error => res.status(500).json({ error : "Erreur serveur" }));
  };

  // Supprimer un message
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

// Ajout des réactions aux messages
exports.addReactions = (req, res, next) => {
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
            message.usersLiked.push(userId)                             // Ajouter le like
          }
    
          if (userWantsToCancel && notTheFirstVote) {
            if (userCanLike) {
                                                                        // Annuler le like de l'utlisateur
              let index = message.usersDisliked.indexOf(userId)
              message.usersDisliked.splice(index, 1)
            }
            if (userCanDislike) {
                                                                        // Annuler le dislike de l'utilisateur
              let index = message.usersLiked.indexOf(userId)
              message.usersLiked.splice(index, 1)
            }
          }
    
          if (userWantsToDislike && userCanDislike) {                    // Ajouter le dislike
            message.usersDisliked.push(userId)
          }
          message.likes = message.usersLiked.length                      // Calculer le nombre de like et dislike
          message.dislikes = message.usersDisliked.length
          let newMessage = message;
          newMessage.save();                                            // Mettre à jour le message avec les nouvelles valeurs
    
          return newMessage;
      })
      .then(message => res.status(200).json(message))
      .catch(error => res.status(400).json({error}));
};