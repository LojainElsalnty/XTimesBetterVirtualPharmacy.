const router = require('express').Router();
const { viewReqPharmacistInfo } = require('../../controllers/admin/viewReqPharmacistInfo');

router.get('/', viewReqPharmacistInfo);


module.exports = router;