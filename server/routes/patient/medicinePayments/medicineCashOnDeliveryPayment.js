const router = require('express').Router();
const { payMedicine } = require('../../../controllers/patient/medicinePayments/medicineCashOnDeliveryController');

router.post('/', payMedicine);


module.exports = router;