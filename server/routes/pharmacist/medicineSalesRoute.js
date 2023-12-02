const express = require('express');
const router = express.Router();
const {filterSalesByMedicine, filterSalesByMonth, filterSalesBydate} = require('../../controllers/pharmacist/medicineSalesController')
//console.log("iam here3")
//search for a pharmacist by username
//router.get('/viewPharmaInfo/:username', viewPharmaInfo);
router.get('/filterByMonth', filterSalesByMonth);
router.get('/filterByDate',filterSalesBydate);
router.get('/filterByMedicine', filterSalesByMedicine);
//router.patch('/updateMedicine', updateMedicine);
//router.get('/viewAllPharma',viewAllPharmaInfo);

module.exports = router;