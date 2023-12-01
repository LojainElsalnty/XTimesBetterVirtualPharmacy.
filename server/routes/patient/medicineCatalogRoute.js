const express = require('express')
const {
    getMedicines,
    searchMedicineByName,
    filterMedicineByUse,
    addToCart,
    viewCart,
    getAlternatives
} = require('../../controllers/patient/medicineCatalogController');


const router = express.Router()


// GET all medicines
router.get('/', getMedicines)

//GET medicine based on given name
router.get('/name/:name', searchMedicineByName)

//GET all medicines based on medicinalUse
router.get('/medicinalUse/:medicinalUse', filterMedicineByUse)

//POST add to cart
router.post('/', addToCart)

//GET to view cart details
router.get('/viewCart', viewCart)

//GET to get Alternatives
router.get('/alternatives/:actIng', getAlternatives)

module.exports = router