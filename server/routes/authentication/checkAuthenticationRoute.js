var router = require('express').Router();
const {checkAccessToken} = require('../../controllers/authentication/checkAccessToken');

router.get('/', checkAccessToken);

module.exports = router;