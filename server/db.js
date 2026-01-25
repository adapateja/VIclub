const mongoose = require('mongoose');
const dotenv = require('dotenv').config()

const connectDB = async () => {

    try {
        const conn = await mongoose.connect(process.env.MY_MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log(`mongo database is connected!!!`)
    } catch (error) {
        console.error(`Error: ${error} `)
        process.exit(1) //passing 1 - will exit the proccess with error
    }

}

module.exports = connectDB
