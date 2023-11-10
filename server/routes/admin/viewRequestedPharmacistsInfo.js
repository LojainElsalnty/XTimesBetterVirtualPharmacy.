const router = require('express').Router();
const { viewReqPharmacistsInfo, acceptPharmacist, rejectPharmacist } = require('../../controllers/admin/viewReqPharmacistsInfo');

router.get('/', viewReqPharmacistsInfo);
router.get('/accept/:id', acceptPharmacist);
router.get('/reject/:id', rejectPharmacist);



module.exports = router;