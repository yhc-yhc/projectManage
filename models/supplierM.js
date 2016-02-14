var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');
var _Supplier = new Schema({
        _id             :{

            type:String,
            unique:true,
            'default':shortid.generate
        },
        sname           :String,
        saddress        :String,
        stype           :String,
        sOthers         :String
    });
module.exports = mongoose.model('suppliers',_Supplier);