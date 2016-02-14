var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//首页路由
var routes = require('./routes/index');
//项目管理路由
var projects = require('./routes/projectManage');
//合同管理路由
var contracts = require('./routes/contractManage');
//供应商管理路由
var suppliers = require('./routes/supplierManage');
//设备管理路由
var devices = require('./routes/deviceManage');
//联系人管理路由
var contacts = require('./routes/contactsManage');
//测试路由
var tests = require('./routes/tests');

var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.0.105/m-e-n');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.listen(3000);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/projects', projects);
app.use('/contracts', contracts);
app.use('/suppliers', suppliers);
app.use('/devices', devices);
app.use('/contacts', contacts);


app.get('/doing',function(req, res, next) {
  res.render('doing')
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
