const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const adminModel = require('../../models/Admin');
const patientModel = require('../../models/Patient');
const pharmacistModel = require('../../models/Pharmacist');
const bcrypt = require('bcrypt');

const addAdmin = asyncHandler( async(req,res) => {
    const admin = req.body;

    if (admin.username === undefined) {
        return res.status(400).json({ message: 'Please add a username!', registeredIn: false });
    }

    if (admin.password === undefined) {
        return res.status(400).json({ message: 'Please add a password!', registeredIn: false });
    }
    let takenUsername = null;

    takenUsername =  await adminModel.findOne({ username: admin.username });

    if (takenUsername) {
        return res.status(400).json({ message: 'Username already taken!', registeredIn: false });
    } else {
        // Generate a hashcode of admin's password
        admin.password = await bcrypt.hash(admin.password, 10);
        const newAdmin = await adminModel.create(admin);
        res.status(200).json({ message: 'Success', admin: newAdmin, registeredIn: true });
    }
});

// const removeAdmin = asyncHandler( async(req,res) => {
//     app.delete("/admin/:username", async (req, res, next) => {
//         const username = req.params.username;
      
//         try {
//           admin.remove({ _username: username }).exec().then(data => {
//               res.json(data);
//             });
//         } catch (error) {
//           console.log(error);
//         }
//       })
// });
const removeAdmin= asyncHandler( async(req,res) => {
        const admin=req.body;
        let existUsername = null;

        existUsername =  await adminModel.findOne({ username: admin.username });

    if (existUsername) {
            const deleted =  await adminModel.findOneAndDelete({ username: admin.username});
            res.status(200).send(deleted);
    }
    else{    
    return res.status(400).json({ message: 'Username does not exist!', registeredIn: false });
}
        
});
const getAdmins = asyncHandler(async (req, res) => {
    let admin = await adminModel.find();
    res.status(200).json(admin);
});

const removePatient= asyncHandler( async(req,res) => {
    const patient=req.body;
    let existUsername = null;

    existUsername =  await patientModel.findOne({ username: patient.username });

if (existUsername) {
        const deleted =  await patientModel.findOneAndDelete({ username: patient.username});
        res.status(200).send(deleted);
}
else{    
return res.status(400).json({ message: 'Username does not exist!', registeredIn: false });
}
    
});

const removePharmacist= asyncHandler( async(req,res) => {
    const pharmacist=req.body;
    let existUsername = null;

    existUsername =  await pharmacistModel.findOne({ username: pharmacist.username });

if (existUsername) {
        const deleted =  await pharmacistModel.findOneAndDelete({ username: pharmacist.username});
        res.status(200).send(deleted);
}
else{    
return res.status(400).json({ message: 'Username does not exist!', registeredIn: false });
}
    
});



module.exports= {addAdmin,removeAdmin, getAdmins, removePatient, removePharmacist};