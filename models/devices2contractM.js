var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');
var _Devices2contract = new Schema({
        _id:{
            type:String,
            unique:true,
            'default':shortid.generate
        },
        d2cCid:{
            type : String,
            ref : 'contracts'
        },
        d2cDid:{
            type : String,
            ref : 'devices'
        },
        d2cDnum:Number,
        d2cDTime:String,
        d2cDflowInfo:String,
    });
module.exports = mongoose.model('dvs2contracts',_Devices2contract);
