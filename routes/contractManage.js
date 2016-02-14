var express = require('express');
var router = express.Router();


var projectM = require('../models/projectM');
var contractM = require('../models/contractM');
var supplierM = require('../models/supplierM');
var devs2contractM = require('../models/devices2contractM');


/* GET contracts listing. */
router.get('/', function(req, res, next) {
  contractM.find(function(err, doc) { 
        res.render('contracts/contractList', {title:'合同管理',menu:'合同', docs: doc});
    }).populate('cPro').populate('cSupplier').exec(); 
});

/* add contract */
router.get('/addContractP', function(req, res, next) {
    projectM.find(function(err, doc) { 
        supplierM.find(function(err, suppliers){
            res.render('contracts/addContract', {title:'合同管理',menu:'添加合同',projects:doc,suppliers:suppliers}); 
        })
    }); 
});
/* add contract */
router.post('/addc', function(req, res, next) {
console.log('是否开票：'+ (req.body.cIstickout =='on'))
  var contract = new contractM({ 
        cid         :req.body.cid,
        cname       : req.body.cname, 
        cSupplier   :req.body.cSupplier,
        cPro        : req.body.cPro,
        ccontent    :req.body.ccontent,
        cIstickout  :req.body.cIstickout=='on'?true:false,
        cIscontainFlowM:req.body.cIscontainFlowM=='on'?true:false,
        ctime       : req.body.ctime,
        cPerson     :req.body.cPerson,
        cPhone     :req.body.cPhone,
        cOthers     :req.body.cOthers,
    }); 
    contract.save(function(err,docs){
      res.redirect('/contracts'); 
    }); 
});

/* del contract */
router.get('/delc', function(req, res, next) {
  contractM.remove({_id : req.query._id},function(err,docs){
    res.redirect('/contracts'); 
  });

});

//updatapp
/* updatapp contract */
router.get('/updatacp', function(req, res, next) {
    contractM.findOne({_id : req.query._id},function(err,contract){
        projectM.find(function(err, projects) {
             supplierM.find(function(err, suppliers){
                res.render('contracts/addContract',{title:'合同管理',menu:'修改合同', doc: contract,    projects:projects,suppliers:suppliers});
             })
        }); 
    });
});

//updatapp
/* updatapp contract */
router.post('/updatac', function(req, res, next) {
    contractM.update(
        {_id : req.body._id},
        {
            $set: {
                cid         :req.body.cid,
                cname       : req.body.cname, 
                cSupplier   :req.body.cSupplier,
                cPro        : req.body.cPro,
                ccontent    :req.body.ccontent,
                cIstickout  :req.body.cIstickout=='on'?true:false,
                cIscontainFlowM:req.body.cIscontainFlowM=='on'?true:false,
                ctime       : req.body.ctime,
                ctime       : req.body.ctime,
                cPerson     :req.body.cPerson,
                cPhone     :req.body.cPhone,
                cOthers     :req.body.cOthers,
            }
        },function(){
            res.redirect('/contracts');
        }
    );
});

//select contract by porjectid
router.get('/selContractByProjectId', function(req, res, next) {
    //res.send('searching')
  contractM.find({cPro:req.query._id},function(err, doc) { 
        res.render('contracts/contractList', {title:'合同管理',menu:'合同', docs: doc});
    }).populate('cPro').exec(); 
});

//相关合同设备列表
router.get('/devices', function(req, res, next) {
    devs2contractM.find(function(err, doc){
            res.render('contracts/dvs2contractList', {title:'合同设备管理',menu:'合同设备',docs:doc}); 
        }).populate('d2cCid').populate('d2cDid').populate('cPro').exec();
});

//为合同添加设备
router.get('/addDevicesForContract', function(req, res, next) {
    contractM.find(function(err, contracts){
            res.render('contracts/addDevicesForContract', {title:'合同设备管理',menu:'添加合同设备',contracts:contracts}); 
        }).populate('cSupplier').exec();
});

//为合同添加设备 把数据加入到数据库
router.post('/doAddDevicesForContract', function(req, res, next) {
    var devs2contract = new devs2contractM({
        d2cCid  :req.body.d2cCid,
        d2cDid  :req.body.d2cDid,
        d2cDnum  :req.body.d2cDnum,
        d2cDTime  :req.body.d2cDTime,
        d2cDflowInfo  :req.body.d2cDflowInfo,
    });
    devs2contract.save(function(err,docs){
        res.redirect('/contracts/devices'); 
    });
});
//deld2c
router.get('/deld2c', function(req, res, next) {
    devs2contractM.remove({_id : req.query._id},function(err,docs){
        res.redirect('/contracts/devices'); 
    });
});

//为合同添加设备
router.get('/updataDevicesForContract', function(req, res, next) {
    devs2contractM.findOne({_id : req.query._id},function(err,d2c){
        contractM.find(function(err, contracts){
                res.render('contracts/addDevicesForContract', {title:'合同设备管理',menu:'修改合同设备',contracts:contracts,doc:d2c}); 
            }).populate('cSupplier').exec();
    });
});


module.exports = router;