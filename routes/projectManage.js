var express = require('express');
var router = express.Router();

var projectM = require('../models/projectM');

/* GET projects listing. */
router.get('/', function(req, res, next) {
  projectM.find(function(err, doc) { 
        res.render('projects/projectList', {title:'项目管理',menu:'项目', docs: doc});
    }); 
});

/* add project */
router.get('/addpp', function(req, res, next) {
    res.render('projects/addPro', {title:'项目管理',menu:'添加项目'}); 
});
/* add project */
router.post('/addp', function(req, res, next) {
  var project = new projectM({ 
        pname   : req.body.pname, 
        ptime   :req.body.ptime,
        parea   :req.body.parea,
        pperson : req.body.pperson 
    }); 
    project.save(function(err,docs){
      res.redirect('/projects'); 
    }); 
});

/* del project */
router.get('/delp', function(req, res, next) {
  projectM.remove({_id : req.query._id},function(err,docs){
    res.redirect('/projects'); 
  });

});

//updatapp
/* updatapp project */
router.get('/updatapp', function(req, res, next) {
  projectM.findOne({_id : req.query._id},function(err,docs){
    console.log(docs)
    res.render('projects/addPro',{title:'项目管理',menu:'修改项目', doc: docs});
  });
});

//updatapp
/* updatapp project */
router.post('/updatap', function(req, res, next) {
  projectM.update(
    {_id : req.body._id},
    {
      $set: {
        pname   : req.body.pname, 
        ptime   :req.body.ptime,
        parea   :req.body.parea,
        pperson : req.body.pperson
      }
    },function(){
      res.redirect('/projects');
    }
  );
});
module.exports = router;
