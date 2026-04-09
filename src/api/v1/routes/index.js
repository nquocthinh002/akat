
const express = require('express');
const { verifyAccessToken } = require('../middlewares/verifyToken.middleware');
const router = express.Router()

const domain = '/api/v1';


router.use(domain + '/create', require('./create'))
router.use(domain + '/akat', require('./auth'))

// router.use([verifyAccessToken])
router.use(domain + '/users', require('./user'))
router.use(domain + '/stocks', require('./stock'))
router.use(domain + '/signals', require('./signal'))
// router.use(domain + '/plans', require('./plan'))
// router.use(domain, + '/subscriptions', require('./subcription'))
// router.use(domain + '/services', require('./service'))
// router.use(domain + '/bots', require('./bot'))
module.exports = router