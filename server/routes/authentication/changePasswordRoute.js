var router = require('express').Router();
const { updatePassword } = require('../../controllers/authentication/changePasswordController');
const { authenticateToken } = require('../../middleware/authenticateToken');

router.put('/', authenticateToken, updatePassword);

module.exports = router;