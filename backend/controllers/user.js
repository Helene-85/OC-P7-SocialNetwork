const bcrypt = require('bcrypt');                                           // Importation du package de chiffrement bcrytp
const jwt = require('jsonwebtoken');                                        // Importation du package jsonwebtoken
const User = require('../models/user');                                     // Importation modèle User
const fs = require('fs');                                                   // 

// Inscription
exports.signup = (req, res, next) => {
  console.log('abc', req.body);
  bcrypt.hash(req.body.password, 10)                                        // On appelle la fonction de hachage, on créer un nouvel utilisateur, on le sauvegarde dans la BDD
  .then(hash => {
    console.log(hash);
      const user = new User({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash,
      });
      console.log('user', user);
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
    console.log(req.body.password, result.password);
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
      console.log(result);
      res.status(200).json(result)
    }})
};

// Réupérer un seul user
exports.getOneUser = (req, res, next) => {
  let id = req.body.userId
  User.findOneById(id, (err, result) => {
    if(err) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    } else {
      console.log(result);
      res.status(200).json(result)
    }})
};

// Mofifier un user
exports.updateOneUser = (req, res, next) => {
  let user = {
    'id': req.body.bodyuserId,
    'pseudo': req.body.pseudo
  }
  User.modify(user, (err, result) => {
    if(err) {
      return res.status(400).json({ message: 'Modification non effectuée' });
    }
    res.status(201).json({
      pseudo: result.pseudo
    })
  })
};

// Supprimer un user
exports.deleteUser = (req, res, next) => {
      User.delete(req.params.id, (err, result) => {
        if(err) {
        return res.status(400).json({ message: 'Impossible de supprimer l\'utilisateur'});
        }
        res.status(204).json({
            message: 'Utilisateur correctement supprimé'
        })
      })
};
