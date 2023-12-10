const express = require('express')
const { authenticateToken } = require('../../middleware/authenticateToken');

// const { getPrescription } = require('../../controllers/patient/prescriptionsController');
const { getMedicines,createPrescription,getPrescription,
    filterPrescriptionByDate,filterPrescriptionByDoctor,filterPrescriptionByfilled,
    selectPrescriptionFromMyList} = require('../../controllers/patient/prescriptionsController');
const router = express.Router()
// router.get('/v', viewMyPrescriptions);
//router.get('/:patient_username', getPrescription);

router.get('/', authenticateToken, getMedicines);
//router.get('/viewMyPrescriptionInfo/:username', viewMyPrescriptionInfo);
router.post('/create', createPrescription);
router.get('/filter/date/:visitDate',filterPrescriptionByDate);
router.get('/filter/doctor/:name',filterPrescriptionByDoctor);
router.get('/filter/filled/:filledName',filterPrescriptionByfilled);
router.get('/select/:prescriptionSelect',selectPrescriptionFromMyList);
module.exports = router;