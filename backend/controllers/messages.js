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

exports.addLikeDislike = (req, res, next) => {
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
  
        if (userWantsToLike && userCanLike) {
          message.usersLiked.push(userId)                                       // Ajouter "Je like"
        }
        if (userWantsToLove && userCanLove) {
            message.usersLoved.push(userId)                                     // Ajouter "J'adore"
        }
        if (userWantsToLaught && userCanLaught) {
            message.usersLaught.push(userId)                                    // Ajouter "Je ris"
        }
        if (userWantsToBeSurprised && userCanBeSurprised) {
            message.usersBeSurprised.push(userId)                               // Ajouter "Je suis surpris.e"
        }
        if (userWantsToBeImpressed && userCanBeImpressed) {
            message.usersBeImpressed.push(userId)                               // Ajouter "Je suis impressionné.e"
        }
        if (userWantsToCancel && notTheFirstVote) {
          if (!userCanLike) {
                                                                                // Annuler le like de l'utlisateur
            let index = message.usersLiked.indexOf(userId)
            message.usersLiked.splice(index, 1)
          }
        }
        if (userWantsToCancel && notTheFirstVote) {
            if (!userCanLove) {
                                                                                  // Annuler le love de l'utlisateur
              let index = message.usersLoved.indexOf(userId)
              message.usersLoved.splice(index, 1)
            }
        }
        if (userWantsToCancel && notTheFirstVote) {
            if (!userCanLaught) {
                                                                                  // Annuler le love de l'utlisateur
              let index = message.usersLaught.indexOf(userId)
              message.usersLaught.splice(index, 1)
            }
        }
        if (userWantsToCancel && notTheFirstVote) {
            if (!userCanBeSurprised) {
                                                                                  // Annuler le love de l'utlisateur
              let index = message.usersBeSurprised.indexOf(userId)
              message.usersBeSurprised.splice(index, 1)
            }
        }
        if (userWantsToCancel && notTheFirstVote) {
            if (!userCanBeImpressed) {
                                                                                  // Annuler le love de l'utlisateur
              let index = message.usersBeImpressed.indexOf(userId)
              message.usersBeImpressed.splice(index, 1)
            }
        }
        // Calculer le nombre de réactions
        message.likes = message.usersLiked.length                     
        message.loves = message.usersLoved.length
        message.laught = message.usersLaught.length
        message.beSurprised = message.usersBeSurprised.length
        message.beImpressed = message.usersBeImpressed.lenght
        let newmessage = message;
        newmessage.save();                                                         // Mettre à jour le message avec les nouvelles valeurs
  
        return newmessage;
    })
    .then(message => res.status(200).json(message))
    .catch(error => res.status(400).json({error}));
  };