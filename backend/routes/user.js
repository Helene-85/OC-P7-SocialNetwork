const express = require("express");                 // Importation framework express
const router = express.Router();                    // Création routeur avec la méthode router() d'express
const rateLimit = require("express-rate-limit");    // Contre les attaques de force brute

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');  // Importation du middleware multer pour les images
const admin = require('../middleware/adminControl')

// Importation des logiques métier pour les routes
const userController = require("../controllers/user");

// Importation du middleware verifyPassword pour contrôler la complexité du mot de passe
const verifyPassword = require("../middleware/verifyPassword");

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes de test
    max: 5 // 5 essais maximum par adresse IP
  });

// Route POST pour l'inscription d'un utilisateur
router.post("/signup", verifyPassword, userController.signup);

// Route POST pour la connexion d'un utilisateur
router.post("/login", limiter, userController.login);

// Route GET pour afficher tous les utilisateurs
router.get('/users', userController.getAllUsers);

// Route GET pour afficher un user
router.get('/profile/:id', auth, userController.getOneUser);

// Route PUT pour modifier un user
router.put('/profile/:id', auth, userController.updateOneUserPseudo);

// Route PUT pour modifier un user
router.post('/profilPic/:id', auth, multer, userController.updateOneUserFile);

// Route DELETE pour supprimer un user
router.delete('/users/:id', auth, admin, userController.deactivateUser);

module.exports = router;