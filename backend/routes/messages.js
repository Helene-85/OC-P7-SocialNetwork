const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const messageControllers = require('../controllers/messages');

router.get('/', auth, messageControllers.getAllMessages);
router.get('/:id', auth, messageControllers.getOneMessage);
router.post('/', auth, multer, messageControllers.createMessage);
router.post('/:id/like', auth, messageControllers.addLikeDislike);
router.put('/:id', auth, multer, messageControllers.modifyMessage);
router.delete('/:id', auth, messageControllers.deleteMessage);

module.exports = router;