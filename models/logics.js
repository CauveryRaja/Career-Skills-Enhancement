const mongoose=require('mongoose');
const config=require('../config/database');

//user schema
const logicSchema=mongoose.Schema({
    question: {
        type:String,
        required:true
    },
    type: {
        type:String,
        required:true
    },
    testcase1: {
        input: {
            type:String,
            required:true
            },
        output: {
            type:String,
            required:true
        }
    },
    testcase2: {
        input: {
            type:String,
            required:true
            },
        output: {
            type:String,
            required:true
        }
    },
    testcase3: {
        input: {
            type:String,
            required:true
            },
        output: {
            type:String,
            required:true
        }
    }
});

const Logics= module.exports = mongoose.model('Logics',logicSchema);

module.exports.addLogics=function(newlogic,callback) {
            newlogic.save(callback);
}
