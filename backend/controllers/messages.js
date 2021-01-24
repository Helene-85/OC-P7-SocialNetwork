const Message = require('../models/message');
const fs = require('fs');

// Créer un message
exports.createMessage = (req, res, next) => {
    const message = ({
        content: req.body.content,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    console.log('message', message);
    Message.create(message, (err, data) => {
        if(err) {
          return res.status(400).json({ message: 'Impossible de créer le message' });
        } 
        res.send(data);
      })
    .catch(error => res.status(500).json({ error : "Erreur serveur" }));
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

exports.addReactions = (req, res, next) => {
    Message.findOne({ _id: req.params.id })
    .then(message => {
        const userId = req.body.userId;
        let userWantsToLike = (req.body.like === 1);
        let userWantsToLove = (req.body.love === 1);
        let userWantsToLaught = (req.body.laught === 1);
        let userWantsToBeSurprised = (req.body.beSurprised === 1);
        let userWantsToBeImpressed = (req.body.beImpressed === 1);
        let userWantsToCancel = (req.body.like === 0);
        const userCanLike = (!message.usersLiked.includes(userId));
        const userCanLove = (!message.usersLoved.includes(userId));
        const userCanLaught = (!message.usersLaught.includes(userId));
        const userCanBeSurprised = (!message.usersBeSurprised.includes(userId));
        const userCanBeImpressed = (!message.usersBeImpressed.includes(userId));
        const notTheFirstVote = 
        (message.usersLiked.includes(userId) || 
        message.usersDisliked.includes(userId) || 
        message.usersLoved.includes(userId) || 
        message.usersLaught.includes(userId) || 
        message.usersBeSurprised.includes(userId) || 
        message.usersBeImpressed.includes(userId));

        // Ajout des réactions
        if (userWantsToLike && userCanLike) {
          message.usersLiked.push(userId)
        }
        if (userWantsToLove && userCanLove) {
            message.usersLoved.push(userId)
        }
        if (userWantsToLaught && userCanLaught) {
            message.usersLaught.push(userId)
        }
        if (userWantsToBeSurprised && userCanBeSurprised) {
            message.usersBeSurprised.push(userId)
        }
        if (userWantsToBeImpressed && userCanBeImpressed) {
            message.usersBeImpressed.push(userId)
        }

        // Supression des réactions
        if (userWantsToCancel && notTheFirstVote) {
            let index = message.usersLiked.indexOf(userId)
            message.usersLiked.splice(index, 1)
        }
        if (userWantsToCancel && notTheFirstVote) {                                   
              let index = message.usersLoved.indexOf(userId)
              message.usersLoved.splice(index, 1)
        }
        if (userWantsToCancel && notTheFirstVote) {                                               
              let index = message.usersLaught.indexOf(userId)
              message.usersLaught.splice(index, 1)
        }
        if (userWantsToCancel && notTheFirstVote) {                                                     
              let index = message.usersBeSurprised.indexOf(userId)
              message.usersBeSurprised.splice(index, 1)
        }
        if (userWantsToCancel && notTheFirstVote) {                                                      
              let index = message.usersBeImpressed.indexOf(userId)
              message.usersBeImpressed.splice(index, 1)
        }

        // Calculer le nombre de réactions
        message.likes = message.usersLiked.length                     
        message.loves = message.usersLoved.length
        message.laught = message.usersLaught.length
        message.beSurprised = message.usersBeSurprised.length
        message.beImpressed = message.usersBeImpressed.lenght

        // Mettre à jour le message avec les nouvelles valeurs
        let newmessage = message;
        newmessage.save();
  
        return newmessage;
    })
    .then(message => res.status(200).json(message))
    .catch(error => res.status(400).json({error}));
  };