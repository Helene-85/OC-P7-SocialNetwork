const bcrypt = require('bcrypt');                                               // Importation du package bcrytp
const jwt = require('jsonwebtoken');                                            // Importation du package jasonwebtoken
const User = require('../models/user');                                         // Importation modèle User
const fs = require('fs');

// Inscription
exports.signup = (req, res, next) => {
  console.log('abc', req.body);
  bcrypt.hash(req.body.password, 10)                                            // On appelle la fonction de hachage, on créer un nouvel utilisateur, on le sauvegarde dans la BDD
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
  User.findOne(req.body.email, (err, result) => {
    if(err) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    } 
    console.log(result, req.body.password);
    bcrypt.compare(req.body.password, result.password)
    .then(valid => {
      if(!valid) {
        return res.status(401).json({ message: 'Mot de passe invalide'})
      }
      let payload = {
        'userId': result.id,
        'isAdmin': !!result.isAdmin
      };
      res.status(200).json({
        pseudo: result.pseudo,
        email: result.email,
        password: result.password,
        profilPic: result.profilPic,
        isAdmin: result.isAdmin,
        token: jwt.sign(
          payload,
          `${process.env.JWT_KEY}`,
          { expiresIn: '24h' }
        )
      })
    })
  })
  .catch(error => res.status(500).json({ error : "Erreur serveur" }));
};

// Récupérer tous les utilisateurs
/* exports.getAllUsers = (req, res, next) => {
  User.findAll(req.body.email, (err, result) => {
    if(err) {
      return res.status(400).json({ message: 'Utilisateurs non trouvés' });
    } 
      res.status(200).json({
        pseudo: result.pseudo,
        email: result.email,
        password: result.password,
        profilPic: result.profilPic,
        isAdmin: result.isAdmin
      })
    })
  .catch(error => res.status(500).json({ error : "Erreur serveur" }));
};

// Mofifier un user
exports.update = (req, res, next) => {
  User.modify(req.body.pseudo, req.body.email, req.body.password, req.body.profilPic, req.body.isAdmin, (err, result) => {
    if(err) {
      return res.status(400).json({ message: 'Modification non effectuée' });
    }
    res.status(200).json({
      pseudo: result.pseudo,
      email: result.email,
      password: result.password,
      profilPic: result.profilPic,
      isAdmin: result.isAdmin
    })
  })
  .catch(error => res.status(500).json({ error : "Erreur serveur" }));
};

// Supprimer un user
exports.deleteUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then(user => {
      const filename = user.profilPic.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        User.delete({ _id: req.params.id })
        .then(() => res.status(204).json({ message: 'L\'utilisateur a été supprimé !'}))
        .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
}; */