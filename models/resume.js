const mongoose=require('mongoose');
const config=require('../config/database');

//user schema
const resumeSchema=mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    objective: {
        type:String,
        required:true    
    },
    marks: { 
        tenth: {
            type:String,
            required:true
        },
        twelth: {
            type:String,
            required:true
        },
        college: {
            type:String,
            required:true
        }
    },
    interests:[{
        type:String,
        required:true
    }],
    projects:[{
        type:String,
        required:true
    }],
    co_curr:[{
        type:String,
        required:true
    }],
    extra_curr:[{
        type:String,
        required:true
    }],
    strengths:[{
        type:String,
        required:true
    }],
    hobbies:[{
        type:String,
        required:true
    }]
});

const Resume= module.exports = mongoose.model('Resume',resumeSchema);

module.exports.addResume=function(newentry,callback) {
            newentry.save(callback);
}
