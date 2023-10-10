const express = require('express');
const router = express.Router();
const { addMedicine, updateMedicine } = require('../../controllers/pharmacist/medicineController')
//console.log("iam here3")
//search for a pharmacist by username
//router.get('/viewPharmaInfo/:username', viewPharmaInfo);
router.post('/addMedicine', addMedicine);
router.patch('/updateMedicine', updateMedicine);
//router.get('/viewAllPharma',viewAllPharmaInfo);

module.exports = router;