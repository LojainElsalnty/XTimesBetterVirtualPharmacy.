var router = require('express').Router();
const { createPharmacist, getPharmacists, getPharmacistRequests } = require('../../controllers/pharmacist/registerationController');

// APIs
router.post('/', createPharmacist);
router.get('/', getPharmacists);
router.get('/requests', getPharmacistRequests);

module.exports = router;