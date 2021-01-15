const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit"); // Contre les attaques de force brute

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
router.get('/user', userController.getAllUsers);

module.exports = router;