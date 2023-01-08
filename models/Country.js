const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const countryScheme = new Schema({          
    location:{type: String, required:true},
     
},{timestamps:true});


countryScheme.index({location: 1 }, { unique: true });
const Country = mongoose.model('Country',countryScheme);
module.exports =Country;