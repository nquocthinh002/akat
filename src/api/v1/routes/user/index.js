const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user.controller');
const Middlewares = require('../../middlewares/verifyToken.middleware');
// const {uploadImage} = require('../../configs/cloudinary.config')


router.get('/', [Middlewares.verifyAccessToken, Middlewares.isAssistant], UserController.getUsers)
router.get('/personnels', UserController.getPersonnels)
router.get('/me', [Middlewares.verifyAccessToken], UserController.getMe)
router.get('/:userId', [Middlewares.verifyAccessToken, Middlewares.isAssistant], UserController.getUser)
router.patch('/:userId/active', [Middlewares.verifyAccessToken, Middlewares.isAssistant], UserController.updateActive)


// UPDATE    /users/:id/role        // admin ? chac la khong can lam




module.exports = router;