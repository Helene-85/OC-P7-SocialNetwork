const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const messageControllers = require('../controllers/messages');

router.get('/', auth, messageControllers.getAllMessages);
router.get('/:id', auth, messageControllers.getOneMessage);
router.post('/', auth, multer, messageControllers.createMessage);
router.post('/:id/reactions', auth, messageControllers.addReactions);
router.put('/:id', auth, multer, messageControllers.updateMessage);
router.delete('/:id', auth, messageControllers.deleteMessage);
router.post('/:id/reactions', auth, messageControllers.addReactions);

module.exports = router;