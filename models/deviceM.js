var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');
var _Device = new Schema({
        _id:{
            type:String,
            unique:true,
            'default':shortid.generate
        },
        dname:String,
        dSupplier:{
            type : String,
            ref : 'suppliers'
        },
        dprice:Number,
        dafter:String,
        dtype:String,
        dbrand:String,
        dparams:String,
        dprodceTime:String,
    });
module.exports = mongoose.model('devices',_Device);