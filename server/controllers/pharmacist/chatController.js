const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const messageModel = require('../../models/Message.js');
const doctorModel = require('../../models/Doctor.js');
const patientModel = require('../../models/Patient.js');

const getMessages = asyncHandler(async (req, res) => {
    const username1 = req.body.username;
    const username2 = req.params.user_username;

    const messages1 = await messageModel.find({ sender_username: username1, receiver_username: username2 });
    const messages2 = await messageModel.find({ sender_username: username2, receiver_username: username1 });

    let messages = [];
    
    if (messages1 && messages2) {
        messages = messages1.concat(messages2);
    }
    else if (messages1) {
        messages = messages1;
    }
    else if (messages2) {
        messages = messages2;
    }

    messages.sort((a, b) => a.timestamp - b.timestamp); // sort messages in ascending order

    return res.status(200).json({ messages: messages });

});

const postMessage = asyncHandler(async (req, res) => {
    const username1 = req.body.username;
    const username2 = req.params.user_username;
    const message = req.body.message;
    console.log(req.body);

    await messageModel.create({
        sender_username: username1,
        receiver_username: username2,
        message: message,
    })

    return res.status(200).json({ message: 'Message is sent successfully' });
});

const getUsers = asyncHandler(async (req, res) => {
    const username = req.body.username;

    let patientResults = await patientModel.find({}).select("username");
    let doctorResults = await doctorModel.find({}).select("username");

    patientResults = patientResults.map((patient) => patient.username);
    patientResults = new Set(patientResults);    
    patientResults = [...patientResults];

    doctorResults = doctorResults.map((doctor) => doctor.username);
    doctorResults = new Set(doctorResults);
    doctorResults = [...doctorResults];

    let results = patientResults.concat(doctorResults);

    return res.status(200).json({ users: results });
});

module.exports = { getMessages, postMessage, getUsers };