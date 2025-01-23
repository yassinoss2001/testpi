var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var patientsRouter = require('./routes/patients');
var categoriesRouter = require('./routes/categories');
const swaggerDocs = require('./swagger');
const cors = require('cors'); // Import cors

const mongo = require('mongoose');
const maConnection = require('./config/db.json');

// Initialize Express app
var app = express();

// Connect to MongoDB
mongo.connect(maConnection.url)
  .then(() => {
      console.log("Connected to the database");
  })
  .catch((err) => {
      console.log(err);
  });

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from this origin (your React app)
  methods: 'GET,POST,PUT,DELETE', // Allow these HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Allow these headers
};
app.use(cors(corsOptions)); // Enable CORS

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/patients', patientsRouter);
app.use('/categories', categoriesRouter);

// Initialize Swagger
swaggerDocs(app);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;