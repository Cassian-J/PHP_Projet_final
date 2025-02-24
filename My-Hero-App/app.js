var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var signinRouter = require("./routes/signin");
var signupRouter = require("./routes/signup");
var heroAppRouter = require("./routes/My_Hero_App");
var heroRouter = require("./routes/create_hero");
var squadRouter = require("./routes/squad");
var superPowerRouter = require("./routes/super_power");
var enginTypeRouter = require("./routes/engin_type");
var createHeroRouter = require("./routes/create_hero");
var createCityRouter = require("./routes/city");
var createPlanetRouter = require("./routes/planet");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', signinRouter);
app.use('/signup', signupRouter);
app.use('/My_Hero_App', heroAppRouter);
app.use('/create_hero', heroRouter);
app.use('/squad',squadRouter);
app.use('/superpower',superPowerRouter);
app.use('/engin_type',enginTypeRouter);
app.use('/create_hero', createHeroRouter);
app.use('/city', createCityRouter);
app.use('/planet', createPlanetRouter);

// Middleware de vérification automatique de connexion
/*app.use((req, res, next) => {
  if (req.cookies.UserUuid && req.path !== '/My_Hero_App') {
    return res.redirect('/My_Hero_App');
  }
  next();
});
*/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;