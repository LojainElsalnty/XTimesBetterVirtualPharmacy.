var router = require('express').Router();
const {addAdmin,removeAdmin,addAmountToAllPharmacists, getAdmins, getPatients,getPharmacists,removePatient, removePharmacist } = require('../../controllers/admin/admincontroller.js');

// const { removePharmacist } = require('../../controllers/pharmacist/pharmacistcontroller.js');
// const {removePatient} = require('../../controllers/patient/patientcontroller.js');


// APIs
router.delete('/removePatient', removePatient);

// APIs
router.delete('/removePharmacist', removePharmacist);

// APIs
router.post('/', addAdmin);
router.delete('/removeAdmin/:adminUsername', removeAdmin);
router.get('/admin', getAdmins);
router.get('/get',getPatients);
router.get('/gett',getPharmacists);
router.post('/gettt',addAmountToAllPharmacists)

module.exports = router;