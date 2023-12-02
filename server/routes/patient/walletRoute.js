var router = require('express').Router();
const { viewWalletNumber } = require('../../controllers/patient/walletAmountController');
const { authenticateToken } = require('../../middleware/authenticateToken');

router.get('/', authenticateToken, viewWalletNumber);

module.exports = router;