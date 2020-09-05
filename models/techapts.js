const mongoose=require('mongoose');
const config=require('../config/database');

//user schema
const aptSchema=mongoose.Schema({
    question: {
        type:String,
        required:true
    },
    type: {
        type:String,
        required:true
    },
    option1: {
        type:String,
        required:true
    },
    option2: {
        type:String,
        required:true
    },
    option3: {
        type:String,
        required:true
    },
    option4: {
        type:String,
        required:true
    },
    answer: {
        type:String,
        required:true
    },
    solution: {
        type:String,
        required:true
    }
});

const Tapts= module.exports = mongoose.model('Tapts',aptSchema);

module.exports.addApts=function(newapt,callback) {
            newapt.save(callback);
}
