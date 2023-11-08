const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt'); 
const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');
const patientModel = require('../../models/Patient');
const pharmacistModel  = require('../../models/Pharmacist');
const adminModel = require('../../models/Admin');

const CheckEmail = asyncHandler(async (req, res) => {
    const email = req.query.email;
    
    try {
        const patient = await patientModel.findOne({ email: email });
        const pharmacist = await pharmacistModel.findOne({ email: email });
        const admin = await adminModel.findOne({ email: email });

        if ((patient && pharmacist) || (patient && admin) || (admin && pharmacist)) {
            return res.status(400).json({ message: 'Multiple users have same email address'});
        }
        else {
            if (patient || pharmacist || admin) {
                res.status(200).json({ message: 'Email exists in the database'});
            }
            else {
                res.status(404).json({ message: 'Email does not exist in the database'});
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while checking the email'})
    }
});

const UpdatePassword = asyncHandler(async (req, res) => {
    const email = req.query.email;
    const password = req.query.newPassword;
    const newPassword = await bcrypt.hash(password, 10);

    try {
        const patient = await patientModel.findOne({ email: email });
        const pharmacist = await pharmacistModel.findOne({ email: email });
        const admin = await adminModel.findOne({ email: email });

        if ((patient && pharmacist) || (patient && admin) || (admin && pharmacist)) {
            return res.status(400).json({ message: 'Multiple users have same email address'});
        }
        else {
            if (patient) {
                await patientModel.findOneAndUpdate({email: email}, {password: newPassword});
                res.status(200).json({ message: 'Password updated successfully' });            
            }
            if (pharmacist) {
                await pharmacistModel.findOneAndUpdate({email: email}, {password: newPassword});
                res.status(200).json({ message: 'Password updated successfully' }); 
            }
            if (admin) {
                await adminModel.findOneAndUpdate({email: email}, {password: newPassword});
                res.status(200).json({ message: 'Password updated successfully' }); 
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the password' });
    }

});

const SendEmail = (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port:465,
        secure: true, // true for 465, false for other ports
        logger: true,
        debug: true,
        secureConnection: false,
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.APP_PASSWORD,
        },
        tls:{
            rejectUnAuthorized:false
        }
    });
    
    const otp = req.body.otp;
    const recipientEmail = req.body.recipientEmail;

    const mailOptions = {
      from: process.env.MY_EMAIL,
      to: recipientEmail,
      subject: 'PASSWORD RESET',
      html: `<html>
               <body>
                 <h2>Password Recovery</h2>
                 <p>Use this OTP to reset your password. OTP is valid for 1 minute</p>
                 <h3>${otp}</h3>
               </body>
             </html>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send({ message: "An error occurred while sending the email" });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send({ message: "Email sent successfully" });
      }
});};

module.exports = { CheckEmail, UpdatePassword, SendEmail };