const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');
const passport=require('passport');
const mongoose=require('mongoose');
const config=require('./config/database');
const multer = require('multer');

//connect to database
mongoose.connect(config.database);

//on connection
mongoose.connection.on('connected',() => {
    console.log('connected to database'+config.database);
});

//on error
mongoose.connection.on('error',(err) => {
    console.log('database error:'+err);
});

const app=express();

const home=require('./routes/home');
const users=require('./routes/users');
const dash=require('./routes/dash');
const result=require('./routes/result');


//Port Number
const port=process.env.PORT || 8080;
const port=3000;

//CORS Middleware
app.use(cors());

//set static Folder for angular4
app.use(express.static(path.join(__dirname, 'public')));

//body-parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/home',home);
app.use('/dashboard',dash);
app.use('/users',users);
app.use('/result',result);

//Index Route
app.get('/',(req,res) => {
    res.send('Invalid endpoint');
});

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'/angular-src/src/index.html'));
});
//Start server
app.listen(port,() => {
    console.log('server started on port'+port);
});


