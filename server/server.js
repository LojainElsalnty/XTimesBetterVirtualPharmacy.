const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const adminRoutes = require('./routes/admin/adminRoute');
const cors = require('cors');
// const patientRoutes= require('./routes/patient/patientRoute');
// const pharmacistRoutes= require('./routes/pharmacist/pharmacistRoute');


const adminMedicineCatalogRoutes = require('./routes/admin/medicineCatalogRoute')
const patientMedicineCatalogRoutes = require('./routes/patient/medicineCatalogRoute')
const pharmacistMedicineCatalogRoutes = require('./routes/pharmacist/medicineCatalogRoute')


mongoose.set('strictQuery', false);
//const cors = require('cors');
const pharmaRoutes = require('./routes/admin/pharmaRoute');
const patientRoutes = require('./routes/admin/patientRoute');
const medicineRoutes = require('./routes/pharmacist/medicineRoute');

// Express app
const app = express();
const allowedOrigins = ['http://localhost:5173'];
// Set up CORS options.


const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Enable CORS for all routes or specify it for specific routes.
app.use(cors(corsOptions));


mongoose.set('strictQuery', false);




// App variables
const Port = process.env.PORT || 5000;
const MongoURI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//const pharmaRoutes = require('server/routes/pharmaRoutes');


// Middleware for allowing react to fetch() from server
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, OPTIONS');
  next();
});

// Connect to MongoDB

mongoose.connect(MongoURI)
  .then(() => {
    console.log("MongoDB is now connected!")

    // Starting server
    app.listen(Port, () => {
      console.log(`Listening to requests on http://localhost:${Port}`);
    })
  })
  .catch(err => console.log(err));

//Routes
//admin
app.use('/admin/medicineCatalog', adminMedicineCatalogRoutes)
app.use('/admin/viewREQPharmacists', require('./routes/admin/viewRequestedPharmacistsInfo'));
//patient
app.use('/patient/medicineCatalog', patientMedicineCatalogRoutes)
//pharmacist
app.use('/pharmacist/medicineCatalog', pharmacistMedicineCatalogRoutes)

app.use('/pharmaRoutes', pharmaRoutes);
app.use('/patientRoutes', patientRoutes);
app.use('/medicineRoutes', medicineRoutes);

app.use('/admin/addremove', adminRoutes);

app.use('/patient/register', require('./routes/patient/registerRoute'));

// Pharmacist
app.use('/pharmacist/register', require('./routes/pharmacist/registerRoute'));


// app.use('/patient/remove', patientRoutes);
// app.use('/pharmacist/remove', pharmacistRoutes);



