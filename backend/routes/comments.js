const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const commentControllers = require('../controller/comments')

router.post('/', auth, commentControllers.createComment);
router.put('/:id', auth, commentControllers.modifyComment);
router.delete('/:id', auth, commentControllers.deleteComment);