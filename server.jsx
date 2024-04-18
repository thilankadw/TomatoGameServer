require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3090;

connectDB();

app.use(express.json());

app.use('/test', (req,res) => {
    res.send('Hello World');
})

app.use('/api/user', require('./routes/userRoutes'));

mongoose.connection.once('open', () => {
    console.log('connected to mongodb');
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`)); 
})

mongoose.connection.on('error', err => {
    console.log(err);
})