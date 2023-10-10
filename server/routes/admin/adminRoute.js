var router = require('express').Router();
const {addAdmin,removeAdmin, getAdmins, removePatient, removePharmacist } = require('../../controllers/admin/admincontroller.js');

// const { removePharmacist } = require('../../controllers/pharmacist/pharmacistcontroller.js');
// const {removePatient} = require('../../controllers/patient/patientcontroller.js');


// APIs
router.delete('/removePatient', removePatient);

// APIs
router.delete('/removePharmacist', removePharmacist);

// APIs
router.post('/', addAdmin);
router.delete('/removeAdmin', removeAdmin);
router.get('/', getAdmins);

module.exports = router;