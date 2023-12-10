const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const pharmacistModel = require('../../models/Pharmacist');
const pharmacistRequestModel = require('../../models/PharmacistRequest');
const PatientModel = require('../../models/Patient');
const multer = require('multer');
const fs = require('fs'); 

const bcrypt = require('bcrypt');

// Add a new pharmacist to the database
const createPharmacist = asyncHandler(async (req, res) => {
   console.log(req.body);
   console.log(req.files);
   
   try{
      const uploadMiddleware = multer({ storage: storage, fileFilter: fileFilter }).fields([
         { name: 'nationalID', maxCount: 1 },
         { name: 'workingLicense', maxCount: 1 },
         { name: 'pharmacyDegree', maxCount: 1 },
     ]);

     // Handle file uploads
     uploadMiddleware(req, res, async (err) => {
         if (err) {
             console.error('Error during file upload:', err);
             return res.status(500).json({ message: 'Error during file upload', error: err.message, success: false });
         }
   
   const pharmacist = req.body;

   if (pharmacist.username === undefined) {
      return res.status(400).json({ message: 'Please add a username!', success: false });
   }

   if (pharmacist.name === undefined) {
      return res.status(400).json({ message: 'Please add a name!', success: false });
   }

   if (pharmacist.email === undefined) {
      return res.status(400).json({ message: 'Please add an email!', success: false });
   }

   if (pharmacist.password === undefined) {
      return res.status(400).json({ message: 'Please add a password!', success: false });
   }

   if (pharmacist.dob === undefined) {
      return res.status(400).json({ message: 'Please add a date of birth!', success: false });
   }

   if (pharmacist.hourly_rate === undefined) {
      return res.status(400).json({ message: 'Please add an hourly rate!', success: false });
   }

   if (pharmacist.affiliation === undefined) {
      return res.status(400).json({ message: 'Please add an affiliation!', success: false });
   }

   if (pharmacist.educational_background === undefined) {
      return res.status(400).json({ message: 'Please add an educational background!', success: false });
   }

   pharmacist.status = "onhold";

   takenUsername = await pharmacistModel.findOne({ username: pharmacist.username });
   takenEmail = await pharmacistModel.findOne({ email: pharmacist.email });
   takenUsernameReq = await pharmacistRequestModel.findOne({ username: pharmacist.username });
   takenEmailReq = await pharmacistRequestModel.findOne({ email: pharmacist.email });
   takenUsernamePat = await PatientModel.findOne({ username: pharmacist.username });
   takenEmailPat = await PatientModel.findOne({ email: pharmacist.email });

   if (takenUsername || takenUsernameReq||takenUsernamePat ) {
      return res.status(400).json({ message: 'Username already taken!', success: false });
   } else if (takenEmail || takenEmailReq||takenEmailPat) {
      return res.status(400).json({ message: 'Email already registered!', success: false });
   } else {
      console.log(pharmacist);
      console.log(req.files);
      // Generate a hashcode of user's password
      pharmacist.password = await bcrypt.hash(pharmacist.password, 10);
      //const newPharmacistRequest = await pharmacistRequestModel.create(pharmacist);
      //res.status(200).json({ message: "Success", patient: newPharmacistRequest, registeredIn: true });


            const nationalIDFile = req.files['nationalID'][0];
            const workingLicenseFile = req.files['workingLicense'][0];
            const pharmacyDegreeFile = req.files['pharmacyDegree'][0];

            // Check if the file was successfully uploaded
            if (!nationalIDFile) {
                console.error('National ID file upload failed: File not received.');
                return res.status(400).json({ message: 'National ID file upload failed: File not received.', success: false });
            }
            if (!workingLicenseFile) {
                console.error('WorkingLicense file upload failed: File not received.');
                return res.status(400).json({ message: 'WorkingLicense file upload failed: File not received.', success: false });
            }if (!pharmacyDegreeFile) {
                console.error('Pharmacy Degree file upload failed: File not received.');
                return res.status(400).json({ message: 'Pharmacy Degree file upload failed: File not received.', success: false });
            }
            
           //pharmacist.nationalID.path = nationalIDFile.path;
           //pharmacist.nationalID.contentType = nationalIDFile.mimetype;
            
           pharmacist.nationalID=  {
            name: nationalIDFile.filename,
            path: nationalIDFile.path,
            contentType: nationalIDFile.mimetype,
            };
           pharmacist.workingLicense = {
               name: workingLicenseFile.filename,
               path: workingLicenseFile.path,
               contentType: workingLicenseFile.mimetype,
           };
           pharmacist.pharmacyDegree= {
               name: pharmacyDegreeFile.filename,
               path: pharmacyDegreeFile.path,
               contentType: pharmacyDegreeFile.mimetype,
           };
          /*pharmacist.nationalID = nationalIDFile.filename;
          pharmacist.workingLicense = workingLicenseFile.filename;
          pharmacist.pharmacyDegree = pharmacyDegreeFile.filename;
           */
           pharmacist.status=  "onhold";
           console.log(pharmacist);

/*const newPharmacistRequest = await pharmacistRequestModel.create({
  username: pharmacist.username,
  name: pharmacist.name,
  email: pharmacist.email,
  password: pharmacist.password,
  dob: pharmacist.dob,
  hourly_rate: pharmacist.hourly_rate,
  affiliation: pharmacist.affiliation,
  educational_background: pharmacist.educational_background,
  //speciality: pharmacist.speciality,
  nationalID: pharmacist.nationalID,
  workingLicense: pharmacist.workingLicense,
  pharmacyDegree: pharmacist.pharmacyDegree,
  status:pharmacist.status
});*/
         const newPharmacistRequest = await pharmacistRequestModel.create(pharmacist);

         console.log("newPharmacist ",newPharmacistRequest)
         res.status(200).json({ message: "Request sent Successfully", pharmacist: newPharmacistRequest, success: true });
      }});
   } catch (error) {
       console.error('Error occurred during upload:', error);
       return res.status(500).json({ message: 'Error occurred during upload', error: error.message, success: false });
   }

   
});

// Retrieve all pharmacists from the database
const getPharmacists = asyncHandler(async (req, res) => {
   let pharmacists = await pharmacistModel.find();

   res.status(200).json(pharmacists);
});

// Retrieve all pharmacist requests from the database
const getPharmacistRequests = asyncHandler(async (req, res) => {
   let pharmacistRequests = await pharmacistRequestModel.find();

   res.status(200).json(
      
   );
});

 
//files
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     // Set the directory where uploaded files will be stored
     cb(null, '../server/uploads/');
   },
   filename: function (req, file, cb) {
     // Set the file name for the uploaded file
     cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
   },
 });

// Filter file types (e.g., only accept images)

 const fileFilter = function (req, file, cb) {
   const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
 
   if (allowedMimeTypes.includes(file.mimetype)) {
     cb(null, true);
   } else {
     cb(new Error('Invalid file type'), false);
   }
 };

 const upload = multer({
   storage: storage,
   fileFilter: fileFilter,
 });

module.exports = { createPharmacist, getPharmacists, getPharmacistRequests };
