const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const router = express.Router();
const nodemailer = require('nodemailer');

const connectDB = require('./server/database/connection');

const app = express();
dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 3000

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/', require('./server/routes/router'))

//registration
app.get('/registration', (req, res) => {
    res.render("registration")
})
app.get('/', (req, res)=> {
    res.render("index")
})

//render page moved to router.js
// router.get('/menu',function(req,res){
//     res.render(path.join(__dirname+'/views/menu.ejs'));
//   });
// router.get('/restaurant',function(req,res){
//     res.render(path.join(__dirname+'/views/restaurant.ejs'));
//   });
//   router.get('/login',function(req,res){
//     res.render(path.join(__dirname+'/views/login.ejs'));
//   });


//Contact US HTML
app.use(express.json());
app.use('/', router);  
//move to router.js
// router.get('/contact',function(req,res){
//     res.render(path.join(__dirname+'/views/contact.ejs'));
//   });

app.post('/', (req, res)=> {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'developizza@gmail.com',
            pass: 'kgvyfnohsweptqcz'
        }
    })

    const mailOption = {
        from: req.body.cemail,
        to: 'developizza@gmail.com',
        subject: `Message from ${req.body.cemail}: ${req.body.subject}`,
        text: req.body.message
    }
    transporter.sendMail(mailOption,(error, info) => {
        if(error){
            console.log(error);
            res.send('error');
        }
        else
        {
            console.log('Email sent: '+ info.response)
            res.send('success')
        }
    })
})

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});