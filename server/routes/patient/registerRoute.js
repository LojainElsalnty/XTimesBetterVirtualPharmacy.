var router = require('express').Router();
const { createPatient, getPatients } = require('../../controllers/patient/registerationController');

// APIs
router.post('/', createPatient);
router.get('/', getPatients);

module.exports = router;