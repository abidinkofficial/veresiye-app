require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();

const userRoutes = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');

//Connecting to DB

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to DB! yeeyy'))

//Adding some middleware

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//Setting the routes

app.use('/api/user', userRoutes);
app.use('/api/account', accountRoutes);

app.get('/api', (req, res) => {
    res.json({ "message": "API is working" })
});

//Setting the PORT and starting the server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));