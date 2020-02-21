'use strict'

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product')
// const User = require('../models/User')





router.get('/:id', async (req, res, next) =>{
    console.log('paso por aqui') 
    try {
        console.log(req.query, req.params);
        const id = req.params.id;
        console.log('el id del user es: ', id)

    
        const element = await Product.find().populate({path: 'user', select: ['email', 'username'], match: {_id: id} }).exec();
  
        if (!element) {
            res.status(404).json({ success: false });
            return;
        }
  
        res.json({ success: true, result: element });
    
      } catch(err) {
        next(err);
      }
});



module.exports = router;