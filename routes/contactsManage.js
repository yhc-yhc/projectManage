var express = require('express');
var router = express.Router();


var supplierM = require('../models/supplierM');
var contactsM = require('../models/contactsM');

router.get('/', function(req, res, next) {
  contactsM.find(function(err, doc) { 
        res.render('contacts/contactsList', {title:'联系人管理',menu:'联系人', docs: doc});
    }).populate('cPro').populate('cSupplier').exec(); 
});


router.get('/addContactsP', function(req, res, next) {
    supplierM.find(function(err, doc) { 
        res.render('contacts/addContacts', {title:'联系人管理',menu:'添加联系人',suppliers:doc}); 
    }); 
});

router.post('/addContacts', function(req, res, next) {
  var contacts = new contactsM({ 
        conName   : req.body.conName, 
        conPositon   :req.body.conPositon,
        cSupplier   :req.body.cSupplier,
        conPhone : req.body.conPhone,
        conTelphone : req.body.conTelphone,
        conQQ : req.body.conQQ,
        conEmail : req.body.conEmail,
        conOthers : req.body.conOthers,
    }); 
    contacts.save(function(err,docs){
      res.redirect('/contacts'); 
    }); 
});

//del
router.get('/del', function(req, res, next) {
  contactsM.remove({_id : req.query._id},function(err,docs){
    res.redirect('/contacts'); 
  });

});

router.get('/updatacontactsP', function(req, res, next) {
    contactsM.findOne({_id : req.query._id},function(err,contacts){
        supplierM.find(function(err, suppliers) { 
            res.render('contacts/addContacts',{title:'联系人管理',menu:'修改联系人', doc: contacts,    suppliers:suppliers});
        }); 
  });
});


router.post('/updataContacts', function(req, res, next) {
    contactsM.update(
        {_id : req.body._id},
        {
            $set: {
                conName   : req.body.conName, 
                conPositon   :req.body.conPositon,
                cSupplier   :req.body.cSupplier,
                conPhone : req.body.conPhone,
                conTelphone : req.body.conTelphone,
                conQQ : req.body.conQQ,
                conEmail : req.body.conEmail,
                conOthers : req.body.conOthers,
            }
        },function(){
            res.redirect('/contacts');
        }
    );
});

module.exports = router;