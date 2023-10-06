const express = require('express')
const {
    getMedicines,
    searchMedicineByName,
    filterMedicineByUse
} = require('../../controllers/admin/medicineCatalogController');


const router = express.Router()


// GET all medicines
router.get('/', getMedicines)

//GET medicine based on given name
router.get('/name/:name', searchMedicineByName)

//GET all medicines based on medicinalUse
router.get('/medicinalUse/:medicinalUse', filterMedicineByUse)

module.exports = router