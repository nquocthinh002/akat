const router = require('express').Router()
const controller = require('../../controllers/service.controller')

router.post('/request', controller.requestService)
router.put('/assign/:id', controller.assignBroker)
router.put('/complete/:id', controller.completeService)

// user
// POST   /services/request      // yêu cầu cơ cấu
// GET    /services/me
// GET    /services/:id

// admin
// GET    /services              // tất cả request
// PUT    /services/:id/assign   // assign broker

// broker
// GET    /services/my           // job của broker
// PUT    /services/:id/start
// PUT    /services/:id/complete
// PUT    /services/:id/cancel


module.exports = router