var router = require('express').Router();
const { CheckEmail, UpdatePassword, SendEmail } = require('../../controllers/authentication/resetPasswordController');

router.get('/checkEmail', CheckEmail);
router.put('/updatePassword', UpdatePassword);
router.post('/sendEmail', SendEmail);

module.exports = router;
