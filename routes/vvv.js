/*const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const fs = require('fs-extra');
// Your mLabs connection string
const url = 'mongodb://cauverysiva:raja2533@ds159926.mlab.com:59926/cseapp';
const multer = require('multer');
const util = require('util');
const upload = multer({limits: {fileSize: 2000000 },dest:'/uploads/'});

// Default route http://localhost:3000/
router.get('/', function(req, res){ res.render('index'); });

// Form POST action handler
router.post('/uploadpicture', upload.single('photo'), function (req, res){

if (req.file == null) {
// If Submit was accidentally clicked with no file selected...
res.render('index', { title:'Please select a picture file to submit!' });
} else {

MongoClient.connect(url, function(err, db){
// read the img file from tmp in-memory location
var newImg = fs.readFileSync(req.file.path);
// encode the file as a base64 string.
var encImg = newImg.toString('base64');
// define your new document
var newItem = {
   description: req.body.description,
   contentType: req.file.mimetype,
   size: req.file.size,
   img: Buffer(encImg, 'base64')
};

db.collection('apts')
.insert(newItem, function(err, result){
if (err) { console.log(err); };
   var newoid = new ObjectId(result.ops[0]._id);
   fs.remove(req.file.path, function(err) {
      if (err) { console.log(err) };
      res.render('index', {title:'Thanks for the Picture!'});
      });
   });
});
};
});*/