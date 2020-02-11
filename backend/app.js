const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');



const MONGO_URL = 'mongodb://127.0.0.1:27017/nodepop'



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

// MIDDLEWARES
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configurar cabeceras y cors

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//   next();
// });



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization');
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    return res.status(200).json({});
  }
  next();
});


//Middleware para configurar los settings de i18n
const i18n = require('./lib/i18nConfigure')();
app.use(i18n.init);

/**
 * CONEXION A LA BBDD MONGODB
 */

require('./lib/connectMongoose');



//VARIABLES GLOBALES
app.locals.title = 'NodePop';



/**
 * RUTAS DE MI API
 */
const loginController = require('./controllers/loginController');
const jwtAuth = require('./lib/jwtAuth');

app.post('/api/authenticate', loginController.loginJWT);   
// app.use('/api/product', jwtAuth(), require('./routes/api/products'));
app.use('/api/product', require('./controllers/products'));
app.use('/api/register', require('./controllers/users'));


/**
 * Configuramos la sesion del user
 */

 app.use(session({
   secret: 'estoesunsecretomuySecret0queN0seC0mp4rte',
   resave: true,
   saveUninitialized: true,
  //  store: new MongoStore({
  //    url: MONGO_URL,
  //    autoReconnect: true,
     
  //  })


 }))



/**
 * Rutas para las vistas
 */
// app.use('/', jwtAuth(), require('./routes/api/products'));
app.use('/change-locale', require('./controllers/change-locale'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
