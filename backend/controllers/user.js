const bcrypt = require('bcrypt');                                               // Importation du package bcrytp
const jwt = require('jsonwebtoken');                                            // Importation du package jasonwebtoken
const User = require('../models/user');                                         // Importation modèle User

// LOGIQUE MÉTIER
// Inscription
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)                                            // On appelle la fonction de hachage, on créer un nouvel utilisateur, on le sauvegarde dans la BDD
    .then(hash => {
      const user = new User({
        pseudo: '',
        email: req.body.email,
        password: hash,
        profilPic: '',
        isAdmin: 0
      });
      user.create(user, (err, data) => {
        if(err) {
          return res.status(400).json({ message: 'Il y a un problême' });
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
    bcrypt.compare(req.body.password, result.password)
    .then(valid => {
      if(!valid) {
        return res.status(400).json({ message: 'Mot de passe invalide'})
      }
      res.status(200).json({
        pseudo: result.pseudo,
        email: result.email,
        password: result.password,
        profilPic: result.profilPic,
        isAdmin: result.isAdmin
      })
    })
  })
  .catch(error => res.status(500).json({ error }));
};