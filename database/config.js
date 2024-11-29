const mongoose = require('mongoose');

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };


const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, clientOptions)
        .then(() => console.log('MongoDB Connected...'))
}

module.exports = connectDB