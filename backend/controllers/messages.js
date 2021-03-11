const Message = require('../models/message');
const Utils = require('../libs/utils.js');
const fs = require('fs');

// Créer un message
exports.createMessage = (req, res, next) => 
{
  const newMessage = new Message ({
    user_id: req.body.user_id,
    content: req.body.content,
    image: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
    createdAt: Utils.getSqlDate(),
    updatedAt: Utils.getSqlDate(),
  });
  
  Message.create(newMessage, (err, data) => {
    if(err) {
      return res.status(400).json({ message: 'Impossible de créer le message' });
    } 
    Message.getLatest('', (err, result) => {
      if (err) {
        return res.status(400).json({message: 'Message non trouvé' });
      }
      res.status(200).json(result)
    });
  });
};

// Récupérer tous les messages
exports.getAllMessages = (req, res, next) => {
  Message.findAllWithComments ((err, data) => {
    if(err) {
      return res.status(400).json({ message: 'Impossible de récupérer les messages' });
    } 
    let newData = [];
    let currentId = -1;
    let i = -1;

    data.forEach(message => {
      if(currentId != message.id){
        i++;
        currentId = message.id;
        newData[i] = {...message};
        newData[i].tabComments = [];
      }

      if(message.comment_id != null){
        newData[i].tabComments.push({
          comment_id: message.comment_id, 
          comment_pseudo: message.comment_pseudo, 
          comment_content: message.comment_content
        });
      }
    });
    res.status(200).json(newData)
  })
};

// Récupérer un message
exports.getOneMessage = (req, res, next) => {
  Message.findOne (req.params.id, (err, data) => {
    if(err) {
      return res.status(404).json({ message: 'Message non trouvé' });
    }
    res.status(200).json({
      content: result.content,
      image: result.image
    })
  })
};

// Supprimer un message
exports.deleteMessage = (req, res, next) => {
  Message.delete (req.params.id, (err, data) => {
    if(err) {
      return res.status(400).json({ message: 'Impossible de supprimer le message' });
    }
    res.status(204).json({
      message: 'Utilisateur correctement supprimé'
    })
  })
};
/* const filename = message.imageUrl.split('/images/')[1];
fs.unlink(`images/${filename}`, () => {
  message.deleteOne(req.params.id)
  .then(() => res.status(200).json({ message: 'Le message a été supprimé !'}))
  .catch((error) => res.status(400).json({ error }));
}); */

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