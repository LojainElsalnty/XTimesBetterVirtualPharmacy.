require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

// express app
const app = express()

// middleware
app.use(express.json())



// routes
//Example: app.use('/api/workouts', workoutRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to database')
        // listen to port
        app.listen(process.env.PORT, () => {
            console.log(`Listening to requests on http://localhost:${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    }) 