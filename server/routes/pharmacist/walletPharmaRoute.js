var router = require('express').Router();
const { viewPharmacistWalletNumber } = require('../../controllers/pharmacist/viewPharmacistWalletController');
const { authenticateToken } = require('../../middleware/authenticateToken');

router.get('/', authenticateToken, viewWalletNumber);

module.exports = router;