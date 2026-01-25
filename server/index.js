const express = require("express");
const app = express();
const connectDB = require("./db.js");
const path = require("path");
const jobsRoute = require('./routes/jobsRoute')
const userRoute = require('./routes/usersRoute')
const dotenv = require('dotenv').config()

app.use(express.json())


app.use('/api/jobs/', jobsRoute)
app.use('/api/users/', userRoute)
const port = process.env.PORT || 5000;


// For Production

if (process.env.NODE_ENV === 'PRODUCTION') {

    app.use(express.static(path.join(__dirname, '../client/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
    })
}


connectDB();

app.listen(port, () =>

    console.log(`Server started on PORT: ${process.env.PORT} `)

);