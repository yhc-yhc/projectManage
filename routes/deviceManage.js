var express = require('express');
var router = express.Router();

var supplierM = require('../models/supplierM');
var contractM = require('../models/contractM');
var deviceM = require('../models/deviceM');

router.get('/', function(req, res, next) {
  deviceM.find(function(err, doc) { 
        res.render('devices/deviceList', {title:'设备管理',menu:'设备', docs: doc});
    }).populate('dContract').populate('dSupplier').exec(); 
});

router.get('/addDeviceP', function(req, res, next) {
    supplierM.find(function(err, doc) {
        contractM.find(function(err, contract){
            res.render('devices/addDeviceP', {title:'设备管理',menu:'添加设备',suppliers:doc,contracts:contract}); 
        }) 
    }); 
});

router.post('/addDevice', function(req, res, next) {
  var device = new deviceM({ 
        dname   : req.body.dname, 
        dprice   :req.body.dprice,
        dtype   :req.body.dtype,
        dbrand : req.body.dbrand,
        dparams : req.body.dparams,
        dprodceTime : req.body.dprodceTime,
        dSupplier : req.body.dSupplier,
    }); 
    device.save(function(err,docs){
      res.redirect('/devices'); 
    }); 
});

//del
router.get('/del', function(req, res, next) {
  deviceM.remove({_id : req.query._id},function(err,docs){
    res.redirect('/devices'); 
  });

});

router.get('/updataDeviceP', function(req, res, next) {
    deviceM.findOne({_id : req.query._id},function(err,device){
        supplierM.find(function(err, suppliers) {
            contractM.find(function(err, contracts){
                res.render('devices/addDeviceP',{title:'设备管理',menu:'修改设备', doc: device,    suppliers:suppliers,contracts:contracts});
            }) 
        }); 
  });
});

router.post('/updataDevice', function(req, res, next) {
    deviceM.update(
        {_id : req.body._id},
        {
            $set: {
                dname   : req.body.dname, 
                dContract : req.body.dContract,
                dSupplier : req.body.dSupplier,
                dprice   :req.body.dprice,
                dafter   :req.body.dafter,
                dnum   :req.body.dnum,
                dtype   :req.body.dtype,
                dbrand : req.body.dbrand,
                dparams : req.body.dparams,
                dprodceTime : req.body.dprodceTime,
                dgetTime    :req.body.dgetTime,
                dflowInfo    :req.body.dflowInfo,
            }
        },function(){
            res.redirect('/devices');
        }
    );
});



//根据供应商查设备
router.get('/selById', function(req, res, next) {
    console.log(req.query._id)
    deviceM.find({dSupplier:req.query._id},function(err, devices){
            console.log(devices)
            res.json(devices); 
        })
});

module.exports = router;