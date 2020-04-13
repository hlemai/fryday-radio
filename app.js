const express = require('express');
const bodyParser=require("body-parser");

// Import routes
const index = require('./routes/index');
const app = express();

app.set('trust proxy',1); // trust first proxy
//app.set('json spaces',4);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//add the router
app.use(express.static(__dirname + '/static'));
//Store all HTML files in view folder.

// Handle Routes
app.use('/api', index);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.json({ status: 400, message: 'Something Went Wrong', err });
});

module.exports = app;