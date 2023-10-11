const router = require('express').Router();
const { viewReqPharmacistsInfo } = require('../../controllers/admin/viewReqPharmacistsInfo');

router.get('/', viewReqPharmacistsInfo);


module.exports = router;