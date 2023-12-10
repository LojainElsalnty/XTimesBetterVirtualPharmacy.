const Medicine = require('../../models/Medicine')
const mongoose = require('mongoose')


//get all medicines (including picture of medicine, name, price, description [medicinalUses & activeIngredients]) 
const getMedicines = async (req, res) => {
    const medicines = await Medicine.find({}).sort({ createdAt: -1 }).select('name price medicinalUses activeIngredients image availableQuantity sales archived');
    res.status(200).json(medicines)
}
//get medicine based on given name -> search
const searchMedicineByName = async (req, res) => {
    
    const name = req.params.medName

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
    //all fields included for pharmacist
    const allMedicines = await Medicine.find().select('name price medicinalUses activeIngredients image availableQuantity sales');
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

//archiveMedicine
const archiveMedicine = async (req, res) => {
    const name = req.params.name
    //console.log('Medicine Name Backend:', name);

    const med = await Medicine.findOneAndUpdate({name: name}, {archived: true}); // update the medicine's archive status
    if (!med) {
        return res.status(404).json({ error: 'medicine not found' })
    }
    return res.status(200).json({message: 'Medicine archived successfully', med, success:true});

}
//UnarchiveMedicine
const UnarchiveMedicine = async (req, res) => {
    const name = req.params.name
    //console.log('Medicine Name Backend:', name);

    const med = await Medicine.findOneAndUpdate({name: name}, {archived: false}); // update the medicine's archive status
    if (!med) {
        return res.status(404).json({ error: 'medicine not found' })
    }
    return res.status(200).json({message: 'Medicine Unarhived successfully', med , success:true});

}

module.exports = {
    getMedicines,
    searchMedicineByName,
    filterMedicineByUse,
    archiveMedicine,
    UnarchiveMedicine
}