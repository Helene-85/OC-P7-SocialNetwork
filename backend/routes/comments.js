const express = require("express");
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const commentControllers = require('../controller/comments')

router.get('/', auth, commentControllers.getAllComments);
router.get('/:id', auth, commentControllers.getOneComment);
router.post('/', auth, multer, commentControllers.createComment);
router.put('/:id', auth, multer, commentControllers.modifyComment);
router.delete('/:id', auth, commentControllers.deleteComment);