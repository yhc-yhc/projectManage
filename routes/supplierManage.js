var express = require('express');
var router = express.Router();

var supplierM = require('../models/supplierM');

router.get('/', function(req, res, next) {
  supplierM.find(function(err, doc) { 
        res.render('suppliers/supplierList', {title:'供应商管理',menu:'供应商', docs: doc});
    }) 
});


router.get('/addSupplierP', function(req, res, next) {
    res.render('suppliers/addSupplier', {title:'供应商管理',menu:'添加供应商'});  
});


router.post('/addSuppliers', function(req, res, next) {
  var supplier = new supplierM({ 
        sname   : req.body.sname, 
        saddress   :req.body.saddress,
        stype   :req.body.stype,
        sOthers   :req.body.sOthers,
    }); 
    supplier.save(function(err,docs){
      res.redirect('/suppliers'); 
    }); 
});

router.get('/delSupplier', function(req, res, next) {
  supplierM.remove({_id : req.query._id},function(err,docs){
    res.redirect('/suppliers'); 
  });

});

//updataSupplierP
router.get('/updataSupplierP', function(req, res, next) {
  supplierM.findOne({_id : req.query._id},function(err,docs){
    console.log(docs)
    res.render('suppliers/addSupplier',{title:'供应商管理',menu:'修改供应商', doc: docs});
  });
});

//updataSupplier
router.post('/updataSupplier', function(req, res, next) {
  supplierM.update(
    {_id : req.body._id},
    {
      $set: {
        sname   : req.body.sname, 
        saddress   :req.body.saddress,
        stype   :req.body.stype,
        sOthers   :req.body.sOthers,
      }
    },function(){
      res.redirect('/suppliers');
    }
  );
});

module.exports = router;