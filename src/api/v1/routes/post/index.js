const express = require('express')
const router = express.Router()
const controller = require('../../controllers/post.controller')
const Middlewares = require('../../middlewares/verifyToken.middleware');

// ===== CRUD =====
// router.get('/', controller.getPosts)
// router.get('/:id', controller.getStockById)

// theem upload anh
router.post('/', [Middlewares.verifyAccessToken, Middlewares.isAssistant], controller.createPost)
router.patch('/:id', [Middlewares.verifyAccessToken, Middlewares.isAssistant], controller.updatePost)
router.delete('/:id', [Middlewares.verifyAccessToken, Middlewares.isAssistant], controller.deletePost)

// ===== SEARCH =====
// router.get('/search', controller.searchPost)

module.exports = router