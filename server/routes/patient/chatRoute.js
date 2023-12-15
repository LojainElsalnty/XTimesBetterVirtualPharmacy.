var router = require('express').Router();
const { getMessages, postMessage, getUsers } = require('../../controllers/patient/chatController');
const { authenticateToken } = require('../../middleware/authenticateToken');

router.post('/:user_username', authenticateToken, postMessage);

router.get('/users', authenticateToken, getUsers);

router.get('/:user_username', authenticateToken, getMessages);

module.exports = router;