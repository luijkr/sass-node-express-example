const express = require('express');
var createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// instantiate app
const app = express();

// import routes
const indexRouter = require('./routes/index');
const browseRouter = require('./routes/browse');
const aboutRouter = require('./routes/about');
const wordRouter = require('./routes/word');

// set routes
app.use('/', indexRouter);
app.use('/browse', browseRouter);
app.use('/about', aboutRouter);
app.use('/word', wordRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/dictionary';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

if (app.get('env') === 'staging' || app.get('env') === 'production') {
	// If staging or production, compile the SASS files
	require('./lib/production/prepareProduction')();
}
else {
	// If not staging or production, just compile the libs.scss
	require('./lib/compileSass').compileSassLibs().catch(console.error);

	// Also include the CSS routes for on-the-fly compiling
	const css = require('./routes/css');
	app.use('/css', css);
}

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
