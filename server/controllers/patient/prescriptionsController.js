// #Task route solution
const presModel = require('../../models/Prescription');
const { default: mongoose } = require('mongoose');
const asyncHandler = require('express-async-handler');
const patient = require('../../models/Patient');
const { use } = require('express/lib/router');

const createPrescription = asyncHandler(async (req, res) => {
  const prescription = req.body;
  const newPrescription = await presModel.create(prescription);
  res.status(200).json({ message: 'Success', prescription: newPrescription });
});

// const getMedicines = async (req, res) => {
//   const medicines = await userModel.find({}).sort({ createdAt: -1 }).select('patient_username doctor_username visit_date filled');
//   console.log('Fetched users:', medicines); // Add this line for debugging
//   res.status(200).json(medicines)
// }

const getMedicines = async (req, res) => {
  const prescriptions = req.body

  try {
    const medicines = await presModel.find({patient_username : prescriptions.username})
      .sort({ createdAt: -1 })
      .select('patient_username doctor_username visit_date filled medicines');

    console.log('Fetched medicines for patient:', medicines); // For debugging

    if (medicines.length === 0) {
      return res.status(404).json({ message: 'No medicines found for the patient with the username' });
    }

    res.status(200).json(medicines);
  } catch (error) {
    console.error('Error fetching medicines:', error);
    res.status(500).json({ error: 'Error fetching medicines' });
  }
};

// const viewMyPrescriptions = async (req, res) => {
//     try {
//       const users = await userModel.find({}).sort({created:-1});
//       console.log('Fetched users:', users); // Add this line for debugging
//       res.status(200).json({users });
//     } catch (error) {
//       console.error('Error fetching users:', error); // Add this line for debugging
//       res.status(500).json({ error: 'Failed to fetch users' });
//     }
//   };
const getPrescription = async (req, res) => {
  //const appointments = await appointmentModel.find({ doctor_username: req.query.doctor_username });
  const username = req.body.username;

  const prescription = await presModel.findOne({ patient_username: username });
  if (!prescription) {
    return res.status(404).json({ error: 'No such prescription' });
  }
  res.status(200).json(prescription);
}

const filterPrescriptionByDoctor = async (req, res) => {
  const doctorUsername = req.params.name

  const allDoctors = await presModel.find({}).select('patient_username doctor_username visit_date filled')

  // List of filtered Doctors
  let filteredDoctors = []

  for (let i = 0; i < allDoctors.length; i++) {
    if (allDoctors[i].doctor_username.toLowerCase() == doctorUsername.toLowerCase()) {
      filteredDoctors.push(allDoctors[i])
    }
  }

  if (!filteredDoctors || filteredDoctors.length == 0) {
    return res.status(404).json({ error: 'doctor not found' })
  }

  res.status(200).json(filteredDoctors)
}





const filterPrescriptionByfilled = async (req, res) => {
  try {
    const filledName = req.params.filledName; // The filled status entered by the user (true or false)

    // Assuming you have a Prescription model in MongoDB
    const allPrescriptions = await presModel.find({
      filled: filledName === 'true', // Convert the user's input to a boolean
    });

    if (!allPrescriptions || allPrescriptions.length === 0) {
      return res.status(404).json({ error: 'Prescriptions not found' });
    }

    res.status(200).json(allPrescriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




const filterPrescriptionByDate = async (req, res) => {

  try {
    const date = req.body.visitDate
    const prescriptionsMade = await presModel.find({ visit_date: date })
    if (prescriptionsMade.length === 0) {
      return res.status(404).json({ message: "No prescriptions found for the entered date" });
    }

    res.status(200).json(prescriptionsMade);
  }
  catch (error) {
    res.status(500).json({ error: "Error filtering appointments by date" });
  }

}

const selectPrescriptionFromMyList = async (req, res) => {
  const prescriptionSelect = req.params.prescriptionSelect; // Convert to lowercase for case-insensitive search

  try {
    // Assuming you have a collection of prescriptions and it's named `Prescription`
    const selectedPrescription = await presModel.findOne({
      patient_username: { $regex: `.*\\b${prescriptionSelect}\\b.*`, $options: 'i' },
    }).select('patient_username doctor_username visit_date filled');

    if (!selectedPrescription) {
      return res.status(404).json({ error: 'Prescription not found' });
    }

    res.status(200).json(selectedPrescription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};








module.exports = { getMedicines, createPrescription, getPrescription, filterPrescriptionByDate, filterPrescriptionByDoctor, filterPrescriptionByfilled, selectPrescriptionFromMyList };
