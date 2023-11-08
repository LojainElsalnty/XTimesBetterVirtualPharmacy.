var router = require('express').Router();
const { getPharmacistInfo } = require('../../controllers/pharmacist/pharmacistProfileController');
const { authenticateToken } = require('../../middleware/authenticateToken');

router.get('/', authenticateToken, getPharmacistInfo);

module.exports = router;