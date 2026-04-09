const router = require('express').Router()
const controller = require('../../controllers/subscription.controller')

router.post('/subscribe', controller.subscribe)
router.get('/me', controller.mySubscription)

// POST /subscriptions/subscribe
// GET  /subscriptions/me
// GET  /subscriptions/:id
// PUT  /subscriptions/:id/cancel

// POST   /subscriptions/subscribe

// GET    /subscriptions/me
// GET    /subscriptions/:id

// GET    /subscriptions         // admin

// PUT    /subscriptions/:id/cancel

// Update Signal feed theo plan

module.exports = router