var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: '首页',menu:''});
});
router.get('/logout', function(req, res, next) {
  res.render('login');
});

module.exports = router;
