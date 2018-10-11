const express = require('express');
const hbs = require('hbs')
const fs = require('fs');

var app = express();

app.set('view engine', 'hbs');


app.use(express.static(__dirname + '/public'));



app.use((req, res, next)=>{

  var now = new Date().toString();

  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);

  fs.appendFile('server.log', log + '\n', (error) => {
    console.log('error');
  });

  next();

});

app.use((req, res, next) => {

  res.render('Maintenance.hbs');

});


hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {

  //res.send('<h1>Hello Express</h1>');

res.render('home.hbs', {
  pageTitle : 'Home Page',
  welcomeMessage: 'Welcome to my Web Page'

});



});






app.get('/about', (req, res) => {

  res.render('about.hbs', {
    pageTitle : 'About Page',

  });

});

app.get('/bad', (req, res) =>{

  res.send({response_Message : 'This is the bad response',
error_Code:404});

});

app.listen(3000);
