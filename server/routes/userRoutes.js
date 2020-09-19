const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation');

//Routes for the new user registration

router.post('/register', async (req, res) => {
    //Validating the request
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Prevent duplicating email adresses
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists!');

    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Creating the user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const newUser = await user.save();
        res.send({ user: newUser._id });
    } catch {
        res.status(400).send(err);
    }
});

//Routes for the user login

router.post('/login', async (req, res) => {
    //Validating the request
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Finding the user
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email doesn\'t exist!');

    //Checking password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password!');

    //Giving the token and logging in
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token);
    
    let cookieOptions = {
        maxAge: 1000 * 60 * 60
    }

    res.cookie('auth-token', token, cookieOptions);

    res.json({
      'message': 'logged in',
      'auth-token': token
    });
});

module.exports = router;