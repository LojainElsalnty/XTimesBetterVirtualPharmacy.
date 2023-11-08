var router = require('express').Router();
const { getPatientInfo } = require('../../controllers/patient/patientInfoController');
const { authenticateToken } = require('../../middleware/authenticateToken');

router.get('/', authenticateToken, getPatientInfo);

module.exports = router;