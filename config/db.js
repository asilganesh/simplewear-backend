const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async() => {

    try {
        const mongoUri = process.env.MONGODB_URI
        const connect =  await mongoose.connect(mongoUri,{
        
            // serverSelectionTimeoutMS: 20000,
       })
        console.log(`MongoDb connected : ${connect.connection.host}`)

    }catch(err){
        console.log(`Error : ${err.message}`)
        console.log(`Error : ${err.cause}`)
    }
}

module.exports = connectDB