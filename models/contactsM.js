var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');
var _Contacts = new Schema({
        _id         :{
            type:String,
            unique:true,
            'default':shortid.generate
        },
        conName         :String,
        conPositon       :String,
        cSupplier   :{

            type : String,
            ref : 'suppliers'
        },
        conPhone    :String,
        conTelphone       :String,
        conQQ     :String,
        conEmail      :String,
        conOthers     :String
    });
module.exports = mongoose.model('contacts',_Contacts);