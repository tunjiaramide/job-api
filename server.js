const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
const {json, urlencoded} = require('express');
const jobsRoute = require('./routes/jobs');
const usersRoute = require('./routes/users');
 

const mongoURI = process.env.MONGO_URL;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database is connected');
    })
    .catch((err) => {
        console.log('Error connecting to databse', err)
    })

app.use(json());
app.use(urlencoded({ extended: true}))
app.use(cors());


app.use('/api/jobs', jobsRoute);
app.use('/api/auth', usersRoute);



app.listen(process.env.PORT, () => {
    console.log('Port is connected on port 5000');
})