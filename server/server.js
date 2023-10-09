const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const adminRoutes= require('./routes/admin/adminRoute');
// const patientRoutes= require('./routes/patient/patientRoute');
// const pharmacistRoutes= require('./routes/pharmacist/pharmacistRoute');


mongoose.set('strictQuery', false);

// Express app
const app = express();

// App variables
const Port = process.env.PORT || 5000;
const MongoURI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Middleware for allowing react to fetch() from server
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, OPTIONS');
  next();
});

// Connect to MongoDB
mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
  
  // Starting server
  app.listen(Port, () => {
    console.log(`Listening to requests on http://localhost:${Port}`);
  })
})
.catch(err => console.log(err));

app.use('/admin/addremove', adminRoutes);
// app.use('/patient/remove', patientRoutes);
// app.use('/pharmacist/remove', pharmacistRoutes);