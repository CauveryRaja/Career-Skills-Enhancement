const mongoose=require('mongoose');
const config=require('../config/database');

//company schema
const companySchema=mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    base: {
        type:String,
        required:true
    },
    logo: {
        type:String,
        required:true    
    },
    rounds:[ { 
        type:String,
        required:true
    }],
    count: {
        type:String,
        required:true
    },
    salary: {
        type:String,
        required:true
    },
    link: {
        type:String,
        required:true
    },
    date: {
        type:String,
        required:true
    }
});

const Companies= module.exports = mongoose.model('Companies',companySchema);

module.exports.addCompanies=function(newcompany,callback) {
            newcompany.save(callback);
}
