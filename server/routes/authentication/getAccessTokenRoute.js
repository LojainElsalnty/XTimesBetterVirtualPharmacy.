var router = require('express').Router();
const {changeAccessToken} = require('../../controllers/authentication/generateAccessToken');

router.get('/', changeAccessToken);

module.exports = router;