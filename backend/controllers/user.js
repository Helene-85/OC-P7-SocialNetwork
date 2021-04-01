const bcrypt = require('bcrypt');                                           // Importation du package de chiffrement bcrytp
const jwt = require('jsonwebtoken');                                        // Importation du package jsonwebtoken
const User = require('../models/user');                                     // Importation modèle User
const fs = require('fs');                                                   // 
const Utils = require('../libs/utils.js');

// Inscription
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)                                        // On appelle la fonction de hachage, on créer un nouvel utilisateur, on le sauvegarde dans la BDD
  .then(hash => {
    const user = new User({
      pseudo: req.body.pseudo,
      email: req.body.email,
      password: hash,
      isActive: true,
    });
    User.create(user, (err, data) => {
      if(err) {
        return res.status(400).json({ message: 'Impossible de créer l\'utilisateur' });
      } 
      res.send(data);
    })
  })
  .catch(error => res.status(500).json({ error }));
};

// Connexion
exports.login = (req, res, next) => {
  User.findOneByEmail(req.body.email, (err, result) => {
    if (err) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    } 

    if (!result.isActive) {
      return res.status(400).json({ message: 'Utlisateur trouvé mais désactivé' });
    }

    bcrypt.compare(req.body.password, result.password)
    .then(valid => {
      if (!valid) {
        return res.status(401).json({ message: 'Mot de passe invalide'})
      } else {
      let payload = {
        'userId': result.id,
        'isAdmin': !!result.isAdmin
      };
      let profile = result.profilPic;
      if (!result.profilPic) {
        profile = ''
      }
      res.status(200).json({
        pseudo: result.pseudo,
        userId: result.id,
        profilPic: profile,
        isAdmin: result.isAdmin,
        isActive: result.isActive,
        token: jwt.sign(
          payload,
          `${process.env.JWT_KEY}`,
          { expiresIn: '24h' }
        )
      })
    }})
    .catch(error => res.status(500).json({ error : "Erreur serveur" }));
  })
};

// Récupérer tous les utilisateurs
exports.getAllUsers = (req, res, next) => {
  User.findAll((err, result) => {
    if(err) {
      return res.status(404).json({ message: 'Utilisateurs non trouvés' });
    } else {
      res.status(200).json(result)
    }
  })
};

// Réupérer un seul user
exports.getOneUser = (req, res, next) => {
  let id = req.body.userId
  User.findOneById(id, (err, result) => {
    if(err) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    } else {
      res.status(200).json(result)
    }
  })
};

// Mofifier un pseudo
exports.updateOneUserPseudo = (req, res, next) => {
  let myToken = Utils.getReqToken(req);
  // check pas d'usurpation de user_id
  if((!myToken.isAdmin) && (myToken.userId != req.params.id)) {
    return res.status(401).json({ message: 'Non authorisé' });
  }
  let user = {
    'id': req.params.id,
    'pseudo': req.body.pseudo,
  }
  User.modifyPseudo(user, (err, result) => {
    if(err) {
      return res.status(400).json({ message: 'Modification non effectuée' });
    }
    res.status(201).json({
      pseudo: result.pseudo
    })
  })
};

// Mofifier une profilPic
exports.updateOneUserFile = (req, res, next) => {
  let myToken = Utils.getReqToken(req);
  // check pas d'usurpation de user_id
  if((!myToken.isAdmin) && (myToken.userId != req.params.id)) {
    return res.status(401).json({ message: 'Non authorisé' });
  }

  let user = {
    'id' : req.params.id,
    'profilPic' : req.file ? req.file.filename : null,
  }
  User.modifyProfilPic(user, (err, result) => {
    if(err) {
      return res.status(400).json({ message: 'BACK Modification non effectuée' });
    }
      res.status(201).json({
      profilPic: req.file.filename,
    });
  });
};

// Supprimer un user
exports.deactivateUser = (req, res, next) => {
  User.deactivate(req.params.id, (err, result) => {
    if(err) {
    return res.status(400).json({ message: 'Impossible de supprimer l\'utilisateur'});
    }
    res.status(204).json({
        message: 'Utilisateur correctement supprimé'
    })
  })
};