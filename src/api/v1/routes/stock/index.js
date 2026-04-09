const express = require('express')
const router = express.Router()
const controller = require('../../controllers/stock.controller')
const Middlewares = require('../../middlewares/verifyToken.middleware');

// ===== CRUD =====
router.get('/', controller.getStocks)
// router.get('/:id', controller.getStockById)

router.post('/', [Middlewares.verifyAccessToken, Middlewares.isAssistant], controller.createStock)
router.patch('/:id', [Middlewares.verifyAccessToken, Middlewares.isAssistant], controller.updateStock)
router.delete('/:id', [Middlewares.verifyAccessToken, Middlewares.isAssistant], controller.deleteStock)

// ===== SEARCH =====
router.get('/search', controller.searchStock)

module.exports = router