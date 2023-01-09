const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const ISOCodeSchema=  new Schema({          
    
    code:{type: String, required:true},
    name:{type: String, required:true},
    eu: {type: Boolean, required:true},
},{timestamps:true});


ISOCodeSchema.index({code: 1}, { unique: true });
const ISOCode = mongoose.model('ISOCode',ISOCodeSchema);
module.exports =ISOCode;