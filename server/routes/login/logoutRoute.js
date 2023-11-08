var router = require('express').Router();
const {logoutUser} = require('../../controllers/login/logoutController');

router.delete('/', logoutUser);

module.exports = router;
