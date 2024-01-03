const express = require('express');
const router = express.Router();

const registrationController = require('../controllers/registrationController');

router.get('/registration-info',registrationController.initializeRegisterUi);
router.get('/new-registration-form',registrationController.newRegistrationForm);
router.post('/create-registration',registrationController.registrationPrg);

module.exports = router;