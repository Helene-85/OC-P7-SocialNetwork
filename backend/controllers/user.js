const bcrypt = require('bcrypt');                                               // Importation du package bcrytp
const jwt = require('jsonwebtoken');                                            // Importation du package jasonwebtoken

const User = require('../models/user');

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
          return res.status(400).json({ message: 'Soucis' });
        } 
        res.send(data);
      })
    })
    .catch(error => res.status(500).json({ error }));
};

// Connexion
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })                                           // On trouve l'utilisateur qui correspond à l'email unique
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });         // Message d'erreur en cas d'utilisateur non trouvé
      }
      bcrypt.compare(req.body.password, user.password)                              // Si ok on compare le hash avec celui de la BDD avec bcrypt
          .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({                                                   // Si le mot de passe est validé, un nouveau token est encodé
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              `${process.env.JWT_KEY}`,                                            // Code aléatoire de 32 caractères masqué grâce à dotenv
              { expiresIn: '24h' }                                                 // Expiration de la session au bout de 24h
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ message: 'STOP' }));
};


// Afficher tous les users
/* exports.getAllUsers = (req, res, next) => {
  User.findAll()
  .then(users => res.status(200).json(users))
      .catch(error => res.status(400).json({ error }));
} */

// Afficher un seul user
/* exports.getOneUser = (req, res, next) => {
  User.findOne()
  .then(users => res.status(200).json(users))
      .catch(error => res.status(400).json({ error }));
} */