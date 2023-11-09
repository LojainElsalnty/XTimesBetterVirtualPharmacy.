const router = require('express').Router();
const { payMedicine } = require('../../../controllers/patient/medicinePayments/medicineWalletPaymentController');

router.post('/', payMedicine);


module.exports = router;