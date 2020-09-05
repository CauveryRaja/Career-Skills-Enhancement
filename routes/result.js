const express=require('express');
const router=express.Router();
const passport=require('passport');
const jwt=require('jsonwebtoken');
const config=require('../config/database');
const Scores=require('../models/scores');
const Resume=require('../models/resume');

//Upload logical questions

router.post('/score', ( req, res, next) => {
    let newScore = new Scores({
        email:req.body.email,
        type:req.body.type,
        date:req.body.date,
        answers:req.body.answers,
        correct:req.body.correct,
        wrong:req.body.wrong
    });
    Scores.addScores(newScore,(err,ques) => {
        if(err) {
            res.json({success:false,msg:'Failed to add test scores'});
        } 
        else {
            res.json({success:true,msg:'test scores added successfully'});
        }
    });
});

router.get('/score/:email',( req, res, next) => {
    console.log('getting score info');
    Scores.find({email:req.params.email}).
    exec(function(err,score) {
        if(err) {
            console.log('Error getting scores');
            res.json({success:false,msg:'Failed to read score info'});
        }
        else {
            res.json(score);
        }
    });
});

router.post('/resume', ( req, res, next) => {
    let newEntry = new Resume({
        name:req.body.name,
        email:req.body.email,
        objective:req.body.objective,
        marks: {
            tenth:req.body.marks.tenth,
            twelth:req.body.marks.twelth,
            college:req.body.marks.college
        },
        interests:req.body.interests,
        projects:req.body.projects,
        co_curr:req.body.co_curr,
        extra_curr:req.body.extra_curr,
        strengths:req.body.strengths,
        hobbies:req.body.hobbies
    });
    Resume.addResume(newEntry,(err,ent) => {
        if(err) {
            console.log(err);
            res.json({success:false,msg:'Failed to add resume entries'});
        } 
        else {
            res.json({success:true,msg:'Resume entries added successfully'});
        }
    });
});

router.get('/resume/:email',( req, res, next) => {
    console.log('getting resume info');
    Resume.findOne({email:req.params.email}).
    exec(function(err,resume) {
        if(err) {
            console.log('Error getting resume');
            res.json({success:false,msg:'Failed to read resume info'});
        }
        else {
            res.json(resume);
        }
    });
});

router.put('/resume/:email',( req, res, next) => {
    console.log('updating resume info');
    Resume.findOne({email:req.params.email}).
    exec(function(err,resume) {
        if(err) {
            console.log('Error updating resume');
            res.json({success:false,msg:'Failed to update resume info'});
        }
        else {
            resume.name=req.body.name || resume.name;
            resume.email=req.body.email || resume.email;
            resume.objective=req.body.objective || resume.objective;
            resume.marks = {
                tenth : req.body.marks.tenth || resume.marks.tenth,
                twelth : req.body.marks.twelth || resume.marks.twelth,
                college : req.body.marks.college || resume.marks.college
            };
            /*resume.marks.tenth=req.body.marks.tenth || resume.marks.tenth;
            resume.marks.twelth=req.body.marks.twelth || resume.marks.twelth;
            resume.marks.college=req.body.marks.college || resume.marks.college;*/
            resume.interests=req.body.interests || resume.interests;
            resume.projects=req.body.projects || resume.projects;
            resume.co_curr=req.body.co_curr || resume.co_curr;
            resume.extra_curr=req.body.extra_curr || resume.extra_curr;
            resume.strengths=req.body.strengths || resume.strengths;
            resume.hobbies=req.body.hobbies || resume.hobbies;
            console.log(resume);
            /*resume.save((err, resume) => {
                if (err) {
                    res.json({success:false,msg:'Second Failed to update resume info'});
                }
                res.json({success:true,msg:'Resume entries updated successfully'});
            });*/
            Resume.addResume(resume,(err,ent) => {
                if(err) {
                    console.log(err);
                    res.json({success:false,msg:'Failed to update resume entries'});
                } 
                else {
                    res.json({success:true,msg:'Resume entries updated successfully'});
                }
            });
        }
    });
});

module.exports=router;