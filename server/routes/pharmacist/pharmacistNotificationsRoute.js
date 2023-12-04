const router = require('express').Router();
const { getPharmacistNotifications } = require('../../controllers/pharmacist/pharmacistNotificationsController');
// console.log("here");
router.post('/',  getPharmacistNotifications);

module.exports = router;