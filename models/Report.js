const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const reportScheme = new Schema({      
    date:{ type:Date, required:true},    
    total_cases:{type:Number,required:false},
    total_deaths:{type:Number,required:false},
    new_cases:{type:Number,required:false} ,
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Country"
    }   
},{timestamps:true});


reportScheme.index({ date: 1, country: 1 }, { unique: true });
const Report = mongoose.model('Report',reportScheme);
module.exports =Report;