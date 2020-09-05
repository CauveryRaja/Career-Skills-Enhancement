const express=require('express');
const router=express.Router();
const passport=require('passport');
const jwt=require('jsonwebtoken');
const config=require('../config/database');
const Logics=require('../models/logics');
const Apts=require('../models/apts');
const Tapts=require('../models/techapts');

//Upload logical questions

router.post('/logic', ( req, res, next) => {
    let newLogic = new Logics({
        question:req.body.question,
        type:req.body.type,
        testcase1: {
            input:req.body.testcase1.input,
            output:req.body.testcase1.output
        },
        testcase2: {
            input:req.body.testcase2.input,
            output:req.body.testcase2.output
        },
        testcase3: {
            input:req.body.testcase3.input,
            output:req.body.testcase3.output
        }
    });
    Logics.addLogics(newLogic,(err,ques) => {
        if(err) {
            res.json({success:false,msg:'Failed to add logic questions'});
        } 
        else {
            res.json({success:true,msg:'logic questions added successfully'});
        }
    });
});

router.post('/aptitude', ( req, res, next) => {
    let newapt = new Apts({
        question:req.body.question,
        type:req.body.type,
        option1:req.body.option1,
        option2:req.body.option2,
        option3:req.body.option3,
        option4:req.body.option4,
        answer:req.body.answer,
        solution:req.body.solution
    });
    Apts.addApts(newapt,(err,ques) => {
        if(err) {
            res.json({success:false,msg:'Failed to add aptitude questions'});
        } 
        else {
            res.json({success:true,msg:'Aptitude questions added successfully'});
        }
    });
});

router.post('/techaptitude', ( req, res, next) => {
    let newapt = new Tapts({
        question:req.body.question,
        type:req.body.type,
        option1:req.body.option1,
        option2:req.body.option2,
        option3:req.body.option3,
        option4:req.body.option4,
        answer:req.body.answer,
        solution:req.body.solution
    });
    Tapts.addApts(newapt,(err,ques) => {
        if(err) {
            res.json({success:false,msg:'Failed to add technical aptitude questions'});
        } 
        else {
            res.json({success:true,msg:'Technical aptitude questions added successfully'});
        }
    });
});

router.get('/logic/:type',( req, res, next) => {
    console.log('getting logic questions');
    Logics.find({type:req.params.type}).
    exec(function(err,logic) {
        if(err) {
            console.log('Error getting logics');
            res.json({success:false,msg:'Failed to read logic questions'});
        }
        else {
            res.json(logic);
        }
    });
});

router.get('/aptitude/:type',( req, res, next) => {
    console.log('getting aptitude questions');
    Apts.find({type:req.params.type}).
    exec(function(err,apt) {
        if(err) {
            console.log('Error getting apts');
            res.json({success:false,msg:'Failed to read aptitude questions'});
        }
        else {
            res.json(apt);
        }
    });
});

router.get('/taptitude/:type',( req, res, next) => {
    console.log('getting tech aptitude questions');
    Tapts.find({type:req.params.type}).
    exec(function(err,apt) {
        if(err) {
            console.log('Error getting tech apts');
            res.json({success:false,msg:'Failed to read tech aptitude questions'});
        }
        else {
            res.json(apt);
        }
    });
});

module.exports=router;