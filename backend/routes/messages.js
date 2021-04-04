const express = require('express');                                     // Importation du framework Express
const router = express.Router();                                        // Méthode router() d'express
const auth = require('../middleware/auth');                             // Importation du middleware d'authentification
const multer = require('../middleware/multer-config');                  // Importation du middleware multer pour les images
const admin = require('../middleware/adminControl');                    // Importation du middleware admin pour la suppr des messages
const messageControllers = require('../controllers/messages');          // Importation du controlleur Message

// CRUD
router.post('/', auth, multer, messageControllers.createMessage);
router.get('/', auth, messageControllers.getAllMessages);
router.get('/reactions', auth, messageControllers.getAllReactions);
router.post('/:id/reactions', auth, messageControllers.createReaction);
router.delete('/:id', auth, admin, messageControllers.deleteMessage);

module.exports = router;