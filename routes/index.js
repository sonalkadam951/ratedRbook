var express = require('express');
var fs = require('fs');
var nodemailer = require('nodemailer');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/gallery', function(req, res, next) {
  res.render('gallery');
});
router.get('/about' , function (req, res, next){
  res.render('about');
});
router.get('/contact', function (req, res, next) {
  res.render('contact');
});
router.post('/submit', function (req, res, next) {
let name = req.body.name;
let email = req.body.email;
let number = req.body.number;
fs.appendFile('data.txt', `name:${name}, email:${email}, number:${number}\n`, function(err) {
  if(err) {
    console.log(err);
  }
});
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sonalkadam951@gmail.com',
    pass: 'sonal_123'
  }
});
var mailOptions ={
  from: 'raterR@gmail.com',
  to: req.body.email,
  subject: 'booking confirmation',
  text: 'You have successfully booked your tickets'
}
transporter.sendMail(mailOptions, function(err, info) {
  if(err)
  console.log(err);
  else{
    res.render('success')//change it to sucsses which is a new page
  }
});
  
});


module.exports = router;
