const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const path = require('path');

const Server = require('socket.io').Server;
const roomModel = require('./models/Room');

const adminRoutes = require('./routes/admin/adminRoute');
const adminMedicineCatalogRoutes = require('./routes/admin/medicineCatalogRoute');
const patientMedicineCatalogRoutes = require('./routes/patient/medicineCatalogRoute');
const pharmacistMedicineCatalogRoutes = require('./routes/pharmacist/medicineCatalogRoute');
const pharmaRoutes = require('./routes/admin/pharmaRoute');
const patientRoutes = require('./routes/admin/patientRoute');
const medicineRoutes = require('./routes/pharmacist/medicineRoute');
const patientCheckoutAddressRoutes = require('./routes/patient/checkoutAddressRoute');
const patientPastOrdersRoutes = require('./routes/patient/pastOrdersRoute');
const myCartRoutes = require('./routes/patient/myCartRoute');
const filterSalesRoute = require('./routes/pharmacist/filterSalesRoute');
const viewSalesRoute = require('./routes/pharmacist/viewSalesRoute');
const viewSalesAdminRoute = require('./routes/admin/viewSalesRoute');
const myPrescriptionRoutes = require('./routes/patient/myPrescriptionRoute');
const prescriptionRoutes = require('./routes/patient/prescriptions');

//const upload = require('./upload'); // Import the Multer configuration
const router = express.Router();
// const patientRoutes= require('./routes/patient/patientRoute');
// const pharmacistRoutes= require('./routes/pharmacist/pharmacistRoute');

mongoose.set('strictQuery', false);

// App variables
const Port = process.env.PORT || 8000;
const MongoURI = process.env.MONGO_URI;

// Express app
const app = express();



const allowedOrigins = ['http://localhost:5174'];

// Set up CORS options.
/* const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// // Allow requests from http://localhost:5173
// app.use(cors({
//   origin: 'http://localhost:5174',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true, // If you need to pass cookies, set this to true
// }));
}; */

const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions)); // Enable CORS for all routes or specify it for specific routes.

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
    let expressServer = app.listen(Port, () => {
      console.log(`Listening to requests on http://localhost:${Port}`);
    })

    const socketIO = new Server(expressServer, {
      cors: {
          origin: '*',
          credentials: true,            //access-control-allow-credentials:true
          optionSuccessStatus: 200,
      }
    });

    socketIO.on('connection', (socket) => {
      console.log(`⚡: ${socket.id} user just connected!`);

      socket.on('room', async data => {
        console.log(data);
        const temp = data.room.split('!@!@2@!@!').reverse().join('!@!@2@!@!');
        console.log(`Temp: ${temp}`);
        const reverseRoom = await roomModel.find({room_id: temp});
        console.log(reverseRoom);
        if(reverseRoom.length != 0) {
          socket.join(temp)
          console.log('joined room',temp)
          //socket.emit('joined',{room:temp})
          // Emit message to all users in the room
          socket.to(temp).emit('message', {name: data.name, text: data.text});
        } else {
            data.room.split('!@!@2@!@!').reverse().join('!@!@2@!@!');
            console.log(`Data Room: ${data.room}`);
            const room = await roomModel.find({room_id: data.room});
            console.log(room);
            if (room.length != 0) {
              socket.join(data.room)
              console.log('joined room', data.room)
              //socket.emit('joined', { room: data.room})
              console.log(room);
              // Emit message to all users in the room
              socket.to(data.room).emit('message', {name: data.name, text: data.text});
            }
            else {
              socket.join(data.room);
              await roomModel.create({ room_id: data.room });
              console.log('joined room',data.room);
              //socket.emit('joined', { room: data.room });
              console.log(room);
              // Emit message to all users in the room
              socket.to(data.room).emit('message', {name: data.name, text: data.text});
            }
        }
      })
    })
  })
  .catch(err => console.log(err));

// -- Routes -- //
// LogIn
app.use('/login', require('./routes/login/loginRoute'));

// LogOut
app.use('/logout', require('./routes/login/logoutRoute'));

// Authentication
app.use('/authentication/checkAccessToken', require('./routes/authentication/checkAuthenticationRoute'));
app.use('/authentication/getAccessToken', require('./routes/authentication/getAccessTokenRoute'));
app.use('/authentication/changePassword', require('./routes/authentication/changePasswordRoute'));

// Reset Password
app.use('/resetPassword', require('./routes/authentication/resetPasswordRoute.js'));

// Patient
app.use('/patient/medicineCatalog', patientMedicineCatalogRoutes);
app.use('/patientRoutes', patientRoutes);
app.use('/patient/register', require('./routes/patient/registerRoute'));
app.use('/patient/checkoutAddress', patientCheckoutAddressRoutes);
app.use('/patient/pastOrders', patientPastOrdersRoutes);
app.use('/patient/myCartRoute', myCartRoutes);
app.use('/patient/myPrescriptionRoute', myPrescriptionRoutes);


app.use('/patient/info', require('./routes/patient/patientInfoRoute.js')); // Get information about logged in patient using his/her username
app.use('/patient/paymentCreditCard', require('./routes/patient/medicinePayments/medicineCreditCardPayment'));
app.use('/patient/paymentWallet', require('./routes/patient/medicinePayments/medicineWalletPayment'));
app.use('/patient/paymentCashOnDelivery', require('./routes/patient/medicinePayments/medicineCashOnDeliveryPayment'));
app.use('/patient/viewWalletNumber', require('./routes/patient/viewWallet'));
app.use('/patient/prescriptionDetails', prescriptionRoutes);


app.use('/patient/chat', require('./routes/patient/chatRoute.js'));

// Pharmacist
app.use('/pharmacist/medicineCatalog', pharmacistMedicineCatalogRoutes)
app.use('/pharmaRoutes', pharmaRoutes);
app.use('/medicineRoutes', medicineRoutes);
app.use('/pharmacist/register', require('./routes/pharmacist/registerRoute'));
app.use('/pharmacist/info', require('./routes/pharmacist/pharmacistInfoRoute.js'));
app.use('/pharmacist/filterSales', filterSalesRoute);
app.use('/pharmacist/viewSales', viewSalesRoute)
app.use('/pharmacist/viewWalletNumber', require('./routes/pharmacist/viewPharmacistWallet')); // Get information about logged in pharmacist using his/her username
//app.use('/pharmacist/info', require('./routes/pharmacist/pharmacistInfoRoute.js')); // Get information about logged in pharmacist using his/her username
app.use('/pharmacist/notifications', require('./routes/pharmacist/pharmacistNotificationsRoute.js'));
app.use('/pharmacist/info', require('./routes/pharmacist/pharmacistInfoRoute.js')); // Get information about logged in pharmacist using his/her username
app.use('/pharmacist/chat', require('./routes/pharmacist/chatRoute.js'));

// Admin 
app.use('/admin/addremove', adminRoutes);
app.use('/admin/medicineCatalog', adminMedicineCatalogRoutes)
app.use('/admin/viewREQPharmacists', require('./routes/admin/viewRequestedPharmacistsInfo'));
app.use('/admin/info', require('./routes/admin/adminInfoRoute.js')); // Get information about logged in admin using his/her username
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/admin/viewSales', viewSalesAdminRoute)


