const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const memberRoute  = require("./routes/member-routes")

//Creating an app from express
const app = express();

//Create the connection to the MongoDB Database
const DB = process.env.DB || 'mongodb+srv://mongodb:mongodb@cluster0.v8zpxv0.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(DB, {
    useNewUrlParser: true,
     useUnifiedTopology: true,
}).then(() =>{
    console.log('Database connected..')
});

//Using express.json to get request of json data
app.use(express.json());

//Using the routes from the file imported above
app.use('/api', memberRoute);

const PORT = process.env.PORT || 6565
app.listen(PORT,()=>{
    console.log(`Server is listening at ${PORT}`);
})