'use strict'

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../models/User')
const cote = require('cote');
const bcrypt = require('bcrypt');



router.post('/',  async (req, res, next) =>{
    try {
        const { username, email, pass } = req.body;
        // const email = req.body.email;
        // const pass = req.body.password;

        console.log('data es: ', username, email, pass)
        const user = new User(
            {
            username,
            email,
            pass: await User.hashPassword(pass),
            
        })
        console.log(user.pass, user.username, user.email)
        const userSaved = await user.save();
        res.json({success: true, result: userSaved})

        
    } catch (err) {
        next(err);
    }


});





module.exports = router;