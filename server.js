// some comment
// one more
// two more
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view render', 'hbs');

hbs.registerHelper('toUpperCase', (text) => {
  return text.toUpperCase();
});
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

app.use(function(req, resp, next){
  var currentTime = new Date().toString();
  var log = `${currentTime}: ${req.method} ${req.path}`;
  console.log(log);
  fs.appendFile('server.log', log+'\n');

  next();
});

// maintaince mode
// app.use((req, resp, next) => {
//   resp.render('maintaince.hbs');
// });

app.get('/', (req, resp) => {
  resp.render('main.hbs', {
    pageTitle: 'Main page',
    helloMessage: 'Hello my friend, great to see you',
  });
});

app.get('/about', (req, resp) => {
  resp.render('about.hbs', {
    pageTitle: 'About page',
  });
});

app.get('/projects', (req, resp) => {
  resp.render('projects.hbs', {
    pageTitle: 'My projects',
  });
});

app.get('/bad', (req, resp) => {
  resp.send({
    errorMessage: 'Unable to request page'
  });
});


app.listen(port, () => {
  console.log(`Server has successfully started on ${port}`);
});
