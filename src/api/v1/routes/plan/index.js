const express = require('express')
const router = express.Router()
const controller = require('../../controllers/signal.controller')

router.post('/', controller.createPlan)
router.get('/', controller.getPlan)

// POST   /plans
// GET    /plans
// GET    /plans/:id
// PUT    /plans/:id
// PUT    /plans/:id/active
// DELETE /plans/:id

// GET    /plans
// GET    /plans/:id

// POST   /plans                 // admin
// PUT    /plans/:id             // admin
// DELETE /plans/:id             // soft delete

// PUT    /plans/:id/active      // bật/tắt

module.exports = router