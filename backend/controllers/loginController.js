'use strict';
const Usuario = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Creamos un Controller que nos servirá para asociar rutas en app.js

class LoginController {

  async loginJWT(req, res, next) {
    try {
      // recoger credenciales de la petición
      const {username, password} = req.body;
      console.log(username, password)
      // buscar el usuario en BD
      const usuario = await Usuario.findOne({ username });
    
      // si no lo encontramos le decimos que no
      if (!usuario || !await bcrypt.compare(password, usuario.pass)) {
        const err = new Error ('invalid credentials') 
        err.status = 401;
        next(err)
        return;
      }

      // creamos un JWT
      // no meter una instancia de mongoose en el Payload!!!!!!!!
      const token = jwt.sign({ _id: usuario._id, email: usuario.email, username: usuario.username }, process.env.JWT_SECRET, {
        expiresIn: '2d'
      });

      // Creamos la cookie con el token insertado

      //primero calculamos la fecha de expiración en milisegundos para pasarsela a la cookie
      const days = 2;
      const expiration = days * 1000 * 60 * 60 * 24;

      res.header('Content-Type', 'application/json;charset=UTF-8')
        res.header('Access-Control-Allow-Credentials', true)
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept'
        )
      res.cookie('wcloneuser', token, {
        expires: new Date(Date.now() + expiration),
        secure: false, // set to true if your using https
        httpOnly: true,
      })
      res.sendStatus(200);
      

    } catch(err) {
      next(err);
    }
  }

}

module.exports = new LoginController();
