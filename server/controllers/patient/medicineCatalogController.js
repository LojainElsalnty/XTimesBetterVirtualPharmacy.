const Medicine = require('../../models/Medicine')
const mongoose = require('mongoose')


//get all medicines (including picture of medicine, name, price, description [medicinalUses & activeIngredients]) 
const getMedicines = async (req, res) => {
    const medicines = await Medicine.find({}).sort({ createdAt: -1 }).select('name price medicinalUses activeIngredients image availableQuantity sales isOTC');
    res.status(200).json(medicines)
}
//get medicine based on given name -> search
const searchMedicineByName = async (req, res) => {
    const name = req.params.name
    //in order to get search results that START given name (e.g. if user types fu -> search result includes fucicort,fucidin,..)
    //i => case-insensitive
    const regex = new RegExp(`^${name}`, 'i');

    const searchResult = await Medicine.find({ name: regex })
    if (!searchResult || searchResult.length == 0) {
        return res.status(404).json({ error: 'medicine not found' })
    }
    res.status(200).json(searchResult)
}

//get all medicines based on given medicinal use -> filter 
const filterMedicineByUse = async (req, res) => {
    //medicinalUse (no 's') cuz route is /medicinalUse/:medicinalUse
    const requestedMedicineUse = req.params.medicinalUse
    //only include fields that need to be displayed to admin/patient
    const allMedicines = await Medicine.find().select('name price medicinalUses activeIngredients image')
    //console.log(allMedicines)
    const filterResult = []
    //looping over all medicines
    for (const medicine of allMedicines) {
        //console.log(medicine.medicinalUses)
        //for each medicine, looping over medicinal use looking for requestedMedicinal use => if found add into filter result
        for (const medUse of medicine.medicinalUses) {
            //console.log("comapring ", medUse, "and ", requestedMedicineUse)
            if (requestedMedicineUse.toLowerCase() === medUse.toLowerCase()) {
                filterResult.push(medicine)
                break
            }
        }
    }
    if (filterResult.length == 0) {
        return res.status(404).json({ error: 'medicine not found' })
    }
    res.status(200).json(filterResult)


}

//Cart functions - sprint 2
//this is user-specific (logged in user's cart)

//cart variable - should belong to a specific username
let cartItems = []

const addToCart = async (req, res) => {
    const { medName } = req.body;
    cartItems = req.body.cartItems;
    //console.log(cartItems)
    const existingItem = cartItems.find((cartItem) => cartItem.medName === medName);
    const medicine = await Medicine.findOne({ name: medName });
    if (existingItem) {
        if (existingItem.quantity + 1 > medicine.availableQuantity) {
            return res.status(400).json({ success: false, message: 'Insufficient stock! Cannot add another to cart' });
        }
        else {
            existingItem.quantity += 1;
        }
        //console.log('item quantity updated', existingItem.medName, ' new quantuty: ', existingItem.quantity)

    } else {
        const item = {
            medName: medName,
            quantity: 1,
            price_per_item: medicine.price
        };
        cartItems.push(item);
        //console.log('new item added', item.medName)
    }

    res.json({ success: true, message: 'Item added to the cart', cartItems });
}

const viewCart = async (req, res) => {
    res.json({ cartItems });
    //cartItems.length = 0; //ADDED
}

module.exports = {
    getMedicines,
    searchMedicineByName,
    filterMedicineByUse,
    addToCart,
    viewCart
}