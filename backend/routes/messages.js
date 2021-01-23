const express = require('express');                                     // Importation du framework Express
const router = express.Router();                                        // Méthode router() d'express
const auth = require('../middleware/auth');                             // Importation du middleware d'authentification
const multer = require('../middleware/multer-config');                  // Importation du middleware multer pour les images
const messageControllers = require('../controllers/messages');          // Importation du controlleur Message

// CRUD
router.get('/', auth, messageControllers.getAllMessages);
router.get('/:id', auth, messageControllers.getOneMessage);
router.post('/', auth, multer, messageControllers.createMessage);
router.post('/:id/reactions', auth, messageControllers.addReactions);
router.put('/:id', auth, multer, messageControllers.updateMessage);
router.post('/:id/reactions', auth, messageControllers.addReactions);
router.delete('/:id', auth, messageControllers.deleteMessage);

module.exports = router;