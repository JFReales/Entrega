const { Router } = require('express');
const userController = require('../controllers/userController');
const { validateUser } = require('../handlers/validationHandler');

const router = Router();

router.get('/:id', userController.getUserByID);
router.post('/register', validateUser, userController.createUser);
router.post('/login', userController.login);
router.post('/recovery', userController.recoveryRequest);
router.put('/reset-password/:id', userController.resetPassword);
router.put('/:id', validateUser, userController.updateUser);

module.exports = router;
