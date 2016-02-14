var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');
var _Project = new Schema({
        _id:{
            type:String,
            unique:true,
            'default':shortid.generate
        },
        pname:String,
        ptime:String,
        parea:String,
        pperson:String
    });
module.exports = mongoose.model('projects',_Project);