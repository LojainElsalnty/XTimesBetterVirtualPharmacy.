const express = require('express')
const {
    getMedicines,
    searchMedicineByName,
    filterMedicineByUse,
    archiveMedicine,
    UnarchiveMedicine
} = require('../../controllers/pharmacist/medicineCatalogController');


const router = express.Router()


// GET all medicines
router.get('/', getMedicines)

//GET medicine based on given name
router.get('/name/:name', searchMedicineByName)

//GET all medicines based on medicinalUse
router.get('/medicinalUse/:medicinalUse', filterMedicineByUse)

//archive medicine
router.post('/:name', archiveMedicine)

//Unarchive medicine
router.post('/unarch/:name', UnarchiveMedicine)

module.exports = router