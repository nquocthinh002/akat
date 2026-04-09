const express = require('express')
const router = express.Router()
const controller = require('../../controllers/bot.controller')

router.post('/', controller.createBot)
router.get('/', controller.getAllBots)

// POST   /bots
// GET    /bots
// GET    /bots/:id
// PUT    /bots/:id
// PUT    /bots/:id/active
// DELETE /bots/:id
// GET    /bots/:id/signals

// GET    /bots
// GET    /bots/:id

// POST   /bots                  // admin
// PUT    /bots/:id              // admin
// DELETE /bots/:id

// PUT    /bots/:id/active

// GET    /bots/:id/signals      // signal của bot

module.exports = router
