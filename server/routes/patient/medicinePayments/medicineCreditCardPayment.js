const router = require('express').Router();
const { payMedicine } = require('../../../controllers/patient/medicinePayments/medicineCreditCardPaymentController');

router.post('/', payMedicine);


module.exports = router;