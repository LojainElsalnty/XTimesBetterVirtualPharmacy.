var router = require('express').Router();
const {loginUser} = require('../../controllers/login/loginController');
const {authenticateToken} = require('../../middleware/authenticateToken');

router.get('/', authenticateToken, (req, res) => {
    res.status(200).json(req.body);
});

router.post('/', loginUser);

module.exports = router;
