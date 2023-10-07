const express = require('express');
const router = express.Router();
const{addMedicine,updateMedicine} = require('../controllers/medicineController')

//search for a pharmacist by username
//router.get('/viewPharmaInfo/:username', viewPharmaInfo);
router.post('/addMedicine', addMedicine);
router.patch('/updateMedicine', updateMedicine);
//router.get('/viewAllPharma',viewAllPharmaInfo);

module.exports = router;