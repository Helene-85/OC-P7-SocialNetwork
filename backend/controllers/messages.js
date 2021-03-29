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
  Message.findOne(req.params.id, (err, data) => {
    if (req.body.image) {
      const filename = data.image.split('/images/')[1];
      fs.unlink(`images/${filename}`, (err) => {
        if (err) {
          res.status(500).send({
            message: err
          })
        };
      });
    }
    Message.delete(req.params.id, (err, data) => {
      if (err) {
        if (err) {
          res.status(404).send({
            message: 'Le message n\'existe pas ou plus'
          });
        } else {
          res.status(500).send({
            message: 'Impossible de supprimer le message'
          });
        }
        res.send({ message: 'Le message a été supprimé'});
      }
    })
  })
};

// Ajouter une réaction
exports.createReaction = (req, res, next) => 
{
  let myToken = Utils.getReqToken(req);

  if(myToken.userId != req.body.user_id) // check pas d'usurpation de user_id
    return res.status(401).json({ message: 'Non authorisé' });
  }

  // TODO : une reaction du type demandée existe ? si oui et qu'elle existe deja une reaction de cet user pour ce message
  // alors on modifie la reaction
  // sinon on ajoute une nouvelle reaction
  // mais si un user a deja ajoute une reaction on ne veut pas qu'il en ajoute une autre ???
 
  return;
  const newReaction = new Reaction ({
    user_id: req.body.user_id,
    message_id: req.body.message_id,
    reaction_id: req.body.reaction_id,
  });

  Reaction.create(newReaction, (err, data) => {
    if(err) {
      return res.status(400).json({ message: "Impossible d'ajouter la réaction" });
    }
    Reaction.latest((err, result) => {
      res.send({
        message_id: result.message_id, 
        comment_id: result.id, 
        comment_pseudo: result.pseudo, 
        comment_content: result.comment
      });
    }); 
  })
};