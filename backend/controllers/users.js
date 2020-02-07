'use strict'

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product')
const User = require('../models/User')
const cote = require('cote');
const bcrypt = require('bcrypt');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', '..', 'public', 'images', 'products'))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
const upload = multer({ storage: storage });

// router.get('/', async (req, res, next) =>{
// try {
//     //Utilizamos el .query ya que son parametros marcados en la url despues de URL?parametros
//     const name = req.query.name;
//     const type = req.query.type;
//     const price = req.query.price;
//     const tags = req.query.tags;
//     const fields = req.query.fields;
//     const limit = parseInt(req.query.limit);
//     const skip = parseInt(req.query.skip);
//     const sort = req.query.sort;

//     const filter = {};

//     if(name){
//         filter.name = new RegExp('.*' + req.query.name, "i"); //El "i" es para que sea insensible a mayusculas/minusculas
//     }

//     if(type){
//         filter.type = type;
//     }

//     if(tags){
//         filter.tags = tags;
//     }


//     if(typeof price !== 'undefined'){
//         const priceToFilter = price.split("-");
        
//         if(priceToFilter.length === 1){
//             filter.price = price
            
//         }else if (priceToFilter.length === 2){
//             const campo1 = parseInt(priceToFilter[0]);
//             const campo2 = parseInt(priceToFilter[1]);
            
//             if(campo1 >= 0 && campo2 >= 0){
//                 filter.price = {'$gte': campo1, '$lte': campo2 };
//             }else if(campo1 >= 0){
//                 filter.price = {'$gte': campo1 };
//             }else if(campo2 >= 0){
//                 filter.price = {'$lte': campo2 };
//             }
//         }

//     }

// const products = await Product.list({filter, skip, limit, fields, sort});

// res.json({success: true, result: products});

// } catch (err) {
//     next(err);
    
// }
// });

// router.get('/item/:id', async (req, res, next) => {

//     try {
//       const _id = req.params.id;
      
  
//       const element = await Product.findById(_id).exec();
  
//       if (!element) {
//         res.status(404).json({ success: false });
//         return;
//       }
  
//       res.json({ success: true, result: element });
  
//     } catch(err) {
//       next(err);
//     }
//   });






router.post('/',  (req, res, next) =>{
    try {
        const username = req.body.username;
        const email = req.body.email;
        const pass = req.body.password;
        const rounds = 10;
        console.log('data es: ', username, email, pass)
        bcrypt.hash(pass, rounds, async function(err, hash){

            const user = new User({username, email, hash });
            console.log(user)
            const newUser= await user.save();   
            res.json({success: true, result: newUser});
    })
        // // Requester para generador de thumbnails
        // const requester = new cote.Requester({ name: 'thumbgenerator client' });
        // requester.send({
        //     type: 'thumbnails',
        //     file: file,
        //     filename: file.originalname,
        //     path: file.path,
        // }, response => {
        //     console.log(`responde el cliente --> ${response}`);
        //   })

        
    } catch (err) {
        next(err);
    }


});



router.get('/tags', async (req, res, next) =>{
    
    try {
        
        const resultado = await Product.distinct('tags');
        res.json({success: true, result: resultado});


    } catch (err) {
        next(err)
    }
});

module.exports = router;