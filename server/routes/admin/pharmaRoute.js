const express = require('express');
const router = express.Router();
const{viewPharmaInfo,addPharmacist, viewAllPharmaInfo} = require('../../controllers/admin/pharmaContoller')

//search for a pharmacist by username
router.get('/viewPharmaInfo/:username', viewPharmaInfo);
router.post('/addPharma', addPharmacist);
router.get('/viewAllPharma',viewAllPharmaInfo);

module.exports = router;
