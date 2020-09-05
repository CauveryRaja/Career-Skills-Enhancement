const express=require('express');
const router=express.Router();
const passport=require('passport');
const jwt=require('jsonwebtoken');
const config=require('../config/database');
const User=require('../models/user');
photo=null;
const Images=require('../models/images');
const multer = require('multer');
const mongoose=require('mongoose');
const path=require('path');
const uploadSchema=mongoose.model('Image');

router.use(express.static(path.join(__dirname, 'angular-src/src/assets/uploads/user')));

const multerConf = {
    storage:multer.diskStorage({
        destination:function(req,file,next) {
            next(null,'./angular-src/src/assets/uploads/user');
        },
        filename:function(req,file,next) {
            console.log(file);
            const ext=file.mimetype.split('/')[1];
            const name=photo.split('.')[0];
            next(null,file.fieldname+"-"+name+'.'+ext);
        }
    }),
    fileFilter:function(req,file,next) {
        console.log("hai,are you there");
        if(!file) {
            next();
        }
        const image=file.mimetype.startsWith('image/jp'); //jpeg short form
        if(image) {
            console.log("are you there",image);
            next(null,true);
        }
        else {
            req.fileValidationError = 'goes wrong on the mimetype';
            next(null,false,new Error('goes wrong on the mimetype'));
        }
    }
};

//Photo uploading

router.post('/upload/user',multer(multerConf).single('photo'),function(req,res){
    if (req.fileValidationError) {
        //I want to jumpt to another page
        res.json({success:false});
        res.send("You didn't upload a valid pic");
    } 
    else {
            console.log("hai"+req.file);
            if(req.file) {
                console.log(req.file);
                req.body.photo = req.file.filename;
            }
            //const upload=new uploadSchema(req.body).save();
            //res.redirect('back');
            let newImg=new Images({
                filename:req.body.filename,
                originalname:req.body.originalname
            });
            Images.addImages(newImg,(err,usr) => {
                res.json({success:true,msg:'company images added successfully'});
            });
    }
});


//Register

router.post('/register', ( req, res, next) => {
    let newUser = new User({
        name:req.body.name,
        email:req.body.email,
        type:req.body.type,
        username:req.body.username,
        password:req.body.password
    });
    User.addUser(newUser,(err,user) => {
        if(err) {
            res.json({success:false,msg:'Failed to add user'});
        } 
        else {
            res.json({success:true,msg:'user added successfully'});
        }
    });
});

//Authenticate

router.post('/authenticate', ( req, res, next) => {
    const username=req.body.username;
    const password=req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success:false,msg:'user not found'});
        }
    
        User.comparePassword(password,user.password,(err,isMatch)=> {
            if(err) throw err;
               
            if(isMatch) {
                console.log(user);
                const token =jwt.sign(user.toObject(),config.secret, {
                    expiresIn: 604800
                });

                res.json({
                    success:true,
                    token:'JWT '+token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username:user.username,
                        email:user.email
                    }
                });
            }
            else {
                return res.json({success:false,msg:'wrong password'});
            }
        });
    });
});

//Profile

router.get('/profile',passport.authenticate('jwt',{session:false}), ( req, res, next) => {
    photo=req.user.email;
    res.json({user: req.user});
    console.log(photo);
});



module.exports=router;