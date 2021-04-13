const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('./auth');
const {registerValidation, loginValidation} = require('./validation');


router.post('/register', async (req, res) => {
    let { first_name, last_name, email, password, phoneNumber } = req.body;
    
    const {error, value} = registerValidation(req.body);
    if(error) return res.status(422).send({message: error.details[0].message});

    // find if email is taken
    const userExist = await User.findOne({email: email });
    if(userExist) return res.status(400).send({message: 'Email already taken'});

    // encrpt password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create a new user and save
    const newUser = User({
        first_name, last_name, email, password: hashedPassword, phoneNumber
    })

    try {
        const createdUser =  await newUser.save();
        res.status(200).send({ message: createdUser});
    } catch(err) {
        res.status(400).send({ message: err})
    }
})

router.post('/login', async (req, res) => {
    // get the email and password
    const { email, password } = req.body;

    const { error, value } = loginValidation(req.body)
    if(error) return res.status(422).send({message: error.details[0].message});

    // check if email exists 
    const userExist = await User.findOne({ email: email });
    if (!userExist) return res.status(500).send({ message: 'User does not exist'})

    // convert plain password to code and compare code
    const checkPassword = await bcrypt.compare(password, userExist.password);
    if(!checkPassword) return res.status(500).send({ message: 'Password Incorrect'});

    const jwtUser = { id: userExist._id, full_name: `${userExist.first_name} ${userExist.last_name}`};
    const token = jwt.sign(jwtUser, process.env.ACCESS_TOKEN, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.status(200).send({ message: "Okay Pass", token});

})

router.get('/admin', auth, (req, res) => {
    res.send({ message: "This is the admin page", user: req.user})
})






module.exports = router;