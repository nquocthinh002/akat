const express = require('express')
const router = express.Router()
const controller = require('../../controllers/signal.controller')

router.post('/', controller.createSignal)
router.get('/', controller.getAllSignals)
router.get('/:id', controller.getSignalById)
router.put('/:id', controller.updateSignal)
router.delete('/:id', controller.deleteSignal)

// Admin duyệt
// GET    /signals/pending       // list chờ duyệt
// PUT    /signals/:id/approve
// PUT    /signals/:id/reject

// Admin duyệt
// GET    /signals/my            // signal của mình

// PUT    /signals/:id           // sửa
// DELETE /signals/:id           // soft delete

// NANG CAO
// PUT    /signals/:id/pin       // ghim
// PUT    /signals/:id/unpin

// PUT    /signals/:id/hot       // đánh dấu hot

// GET    /signals/my
// PUT    /signals/:id
// DELETE /signals/:id

// PUT    /signals/:id/pin
// PUT    /signals/:id/unpin
// PUT    /signals/:id/hot

module.exports = router
