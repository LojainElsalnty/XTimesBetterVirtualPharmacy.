const express = require('express');
const router = express.Router();
const{viewPatientInfo} = require('../../controllers/admin/patientController')

//search for a pharmacist by username
router.get('/viewPatientInfo/:username', viewPatientInfo);

//router.post('/addPharma', addPharmacist);
//router.get('/viewAllPharma',viewAllPharmaInfo);

module.exports = router;