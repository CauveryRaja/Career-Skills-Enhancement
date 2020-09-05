const express=require('express');
const router=express.Router();
const passport=require('passport');
const jwt=require('jsonwebtoken');
const config=require('../config/database');
const Companies=require('../models/companies');
const Images=require('../models/images');
const multer = require('multer');
const mongoose=require('mongoose');
const path=require('path');
const uploadSchema=mongoose.model('Image');
fname=null;

router.use(express.static(path.join(__dirname, 'angular-src/src/assets/uploads/company')));

const multerConf = {
    storage:multer.diskStorage({
        destination:function(req,file,next) {
            next(null,'./angular-src/src/assets/uploads/company');
        },
        filename:function(req,file,next) {
            console.log(file);
            const ext=file.mimetype.split('/')[1];
            next(null,file.fieldname+"-"+fname+'.'+ext);
        }
    }),
    fileFilter:function(req,file,next) {
        if(!file) {
            next();
        }
        const image=file.mimetype.startsWith('image/png');
        if(image) {
            next(null,true);
        }
        else {
            req.fileValidationError = 'goes wrong on the mimetype';
            next(null,false,new Error('goes wrong on the mimetype'));
         }
    }
};

router.post('/upload/company',multer(multerConf).single('logo'),function(req,res){
    if(req.fileValidationError) {
        res.json({success:false});
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
        Images.addImages(newImg,(err,comp) => {
            res.json({success:true,msg:'company images added successfully'});
        });
    }
});

//Display images
router.get('/company/image/:name',( req, res, next) => {
    console.log('getting company image');
    //fname=req.params.name;
    Images.find({filename:req.params.name}).
    exec(function(err,companyimg) {
        if(err) {
            console.log('Error getting cmp info');
            res.json({success:false,msg:'Failed to read cmp info'});
        }
        else {
            console.log(companyimg);
            var fs = require('fs');
            // read binary data
            var bitmap = fs.readFileSync(companyimg.path+"");
            // convert binary data to base64 encoded string
            //res.send(new Buffer(bitmap).toString('base64'));
            companyimg.path = new Buffer(bitmap).toString('base64');

            //res.send(companyimg)
            console.log(companyimg);
            res.send(companyimg);
        }
    });
});

//Upload company info

router.post('/company', ( req, res, next) => {
    let newCompany = new Companies({
        name:req.body.name,
        base:req.body.base,
        logo:req.body.logo,
        rounds:req.body.rounds,
        count:req.body.count,
        salary:req.body.salary,
        link:req.body.link,
        date:req.body.date
    });
    Companies.addCompanies(newCompany,(err,comp) => {
        if(err) {
            res.json({success:false,msg:'Failed to add companies'});
        } 
        else {
            res.json({success:true,msg:'companies added successfully'});
        }
    });
});

router.get('/company',( req, res, next) => {
    console.log('getting all company info');
    Companies.find().
    exec(function(err,company) {
        if(err) {
            console.log('Error getting all cmp info');
            res.json({success:false,msg:'Failed to read all cmp info'});
        }
        else {
            res.json(company);
        }
    });
});

router.get('/company/:name',( req, res, next) => {
    console.log('getting company info');
    fname=req.params.name;
    Companies.find({name:req.params.name}).
    exec(function(err,company) {
        if(err) {
            console.log('Error getting cmp info');
            res.json({success:false,msg:'Failed to read cmp info'});
        }
        else {
            res.json(company);
        }
    });
});

module.exports=router;