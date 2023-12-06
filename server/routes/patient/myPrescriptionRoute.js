const express = require('express');
const router = express.Router();
const{getPrescriptionById,updateCartItemQuantity,decrementCartItemQuantity,deleteMedicineFromPrescription}
 =
 require('../../controllers/patient/myPrescriptionController')


router.get('/getPrescriptionById/:id', getPrescriptionById);
router.put('/updateCartItemQuantity/:medName', updateCartItemQuantity);
router.put('/decrementCartItemQuantity/:medName', decrementCartItemQuantity);
router.delete('/deleteMedicineFromPrescription/:medName',deleteMedicineFromPrescription);

module.exports = router;