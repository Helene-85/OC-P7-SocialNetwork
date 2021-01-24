const express = require('express');                                     // Importation du framework Express
const router = express.Router();                                        // Méthode router() d'express
const auth = require('../middleware/auth');                             // Importation du middleware d'authentification
const multer = require('../middleware/multer-config');                  // Importation du middleware multer pour les images
const messageControllers = require('../controllers/messages');          // Importation du controlleur Message

// CRUD
router.post('/post', auth, multer, messageControllers.createMessage);
router.get('/messages', auth, messageControllers.getAllMessages);
router.get('/message/:id', auth, messageControllers.getOneMessage);
router.post('/:id/reactions', auth, messageControllers.addReactions);
router.put('/update/:id', auth, multer, messageControllers.updateMessage);
router.delete('/messages/:id', auth, messageControllers.deleteMessage);

module.exports = router;