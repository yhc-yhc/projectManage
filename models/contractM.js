var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');
var _Contract = new Schema({
        _id         :{
            type:String,
            unique:true,
            'default':shortid.generate
        },
        cid         :String,
        cname       :String,
        cSupplier   :{

            type : String,
            ref : 'suppliers'
        },
        cPro        :{

            type : String,
            ref : 'projects'
        },
        ccontent    :String,
        cIstickout  :Boolean,
        cIscontainFlowM:Boolean,
        ctime       :String,
        cPerson     :String,
        cPhone      :String,
        cOthers     :String
    });
module.exports = mongoose.model('contracts',_Contract);