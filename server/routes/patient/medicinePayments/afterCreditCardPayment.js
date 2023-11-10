const router = require('express').Router();
const { afterCreditCardPayment } = require('../../../controllers/patient/medicinePayments/afterCreditCardPaymentController');

router.post('/', afterCreditCardPayment);


module.exports = router;