const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const messageModel = require('../../models/Message.js');
const doctorModel = require('../../models/Doctor.js');
const appointmentModel = require('../../models/Appointment.js');
const pharmacistModel = require('../../models/Pharmacist.js');

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

    let doctorResults = await appointmentModel.find({ patient_username: username, status: "completed" }).select("doctor_username");
    let pharmacistResults = await pharmacistModel.find({}).select("username name");
    let doctors = await doctorModel.find({}).select("username name");

    doctorResults = doctorResults.map((doctor) => doctor.doctor_username);
    doctorResults = doctors.filter((doctor) => doctorResults.includes(doctor.username));
    doctorResults = doctorResults.map((doctor) => { return { username: doctor.username, name: doctor.name, type: "doctor" } });
    doctorResults = doctorResults.filter((arr, index, self) => index === self.findIndex((t) => (t.username === arr.username && t.name === arr.name && t.type === arr.type)));
    doctorResults = new Set(doctorResults);
    doctorResults = [...doctorResults];

    console.log(pharmacistResults);
    pharmacistResults = pharmacistResults.map((pharmacist) => { return { username: pharmacist.username, name: pharmacist.name, type: "pharmacist" } });
    pharmacistResults = pharmacistResults.filter((arr, index, self) => index === self.findIndex((t) => (t.username === arr.username && t.name === arr.name && t.type === arr.type)));
    console.log(pharmacistResults);
    pharmacistResults = new Set(pharmacistResults);
    pharmacistResults = [...pharmacistResults];

    let result = doctorResults.concat(pharmacistResults);

    console.log("Get Results:");
    console.log(result);

    return res.status(200).json({ users: result });
});

module.exports = { getMessages, postMessage, getUsers };