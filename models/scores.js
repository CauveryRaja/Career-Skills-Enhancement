const mongoose=require('mongoose');
const config=require('../config/database');

//user schema
const scoreSchema=mongoose.Schema({
    email: {
        type:String,
        required:true
    },
    type: {
        type:String,
        required:true
    },
    date: {
        type:String,
        required:true    
    },
    answers:[ { 
        type:String,
        required:true
    }],
    correct: {
        type:String,
        required:true
    },
    wrong: {
        type:String,
        required:true
    }
});

const Scores= module.exports = mongoose.model('Scores',scoreSchema);

module.exports.addScores=function(newscore,callback) {
            newscore.save(callback);
}
